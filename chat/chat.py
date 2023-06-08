from dataclasses import dataclass
from time import sleep
from typing import Any, List
from dotenv import load_dotenv
from requests.exceptions import HTTPError
import os
import sys
import json
import openai
import pinecone
import argparse

parser = argparse.ArgumentParser(description="Milkyway chatbot")
parser.add_argument(
    "--create_embeddings",
    help="Create embeddings based off the content in content.json",
    action="store_true",
)
parser.add_argument(
    "--example", help='Run with a sample prompt. Usage: --example "What is mindfuture?"'
)
args = parser.parse_args()

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
pc_api_key = os.getenv("PINECONE_API_KEY") or "PINECONE_API_KEY"
pc_env = os.getenv("PINECONE_ENVIRONMENT") or "PINECONE_ENVIRONMENT"

pinecone.init(api_key=pc_api_key, environment=pc_env)


def main():
    # Check if we are authenticated
    if openai.Engine.list() is None:
        print("OpenAI not authenticated", file=sys.stderr)
        exit(1)
    try:
        pinecone.whoami()
    except HTTPError as e:
        print("error connecting to pinecone:\n", e, file=sys.stderr)
        exit(1)

    companies = Company.companies_from_json("content.json")

    # Create pinecone index if it doesn't yet exist
    index_name = "milkyway"
    if index_name not in pinecone.list_indexes():
        print(f"No index named {index_name}. Creating a new one now...")
        pinecone.create_index(
            index_name,
            dimension=1536,  # dimensionality of text-embedding-ada-002
            metric="cosine",
            metadata_config={"indexed": ["title", "url", "text"]},
        )
        print("Index created.")

    index = pinecone.GRPCIndex(index_name)
    print(f"Connected to index {index_name}:\n{index.describe_index_stats()}")

    if args.create_embeddings:
        print("Recreating embeddings...")
        vectors = []
        for i, company in enumerate(companies):
            embedding = []
            # try/except to handle ratelimiting
            try:
                embedding = create_embedding([company.text])
            except:
                done = False
                while not done:
                    sleep(5)
                    try:
                        embedding = create_embedding([company.text])
                        done = True
                    except:
                        pass

            vectors.append(
                {
                    "id": str(i),
                    "values": embedding,
                    "metadata": {
                        "title": company.title,
                        "url": company.url,
                        "text": company.text,
                    },
                }
            )
        index.upsert(vectors)
        print("Embeddings created.")
        print(index.describe_index_stats())

    if args.example:
        contextual_prompt = create_prompt_with_context(args.example, index)
        contextual_response = complete(contextual_prompt)
        print(contextual_response)


@dataclass
class Company:
    title: str
    url: str
    text: str

    @staticmethod
    def companies_from_json(path: str) -> List["Company"]:
        with open(path, "r") as f:
            data = json.load(f)
            return [Company(c["title"], c["url"], c["text"]) for c in data["data"]]


def create_prompt_with_context(query: str, index: pinecone.GRPCIndex) -> str:
    limit = 3750
    xq = create_embedding([query])
    res = index.query(xq, top_k=1, include_metadata=True)
    contexts = [x["metadata"]["text"] for x in res["matches"]]
    prompt = ""
    prompt_start = "Answer the question based on the context below.\n\n" + "Context:\n"
    prompt_end = f"\n\nQuestion: {query}\nAnswer:"
    for i in range(0, len(contexts)):
        if len("\n\n---\n\n".join(contexts[:i])) >= limit:
            prompt = prompt_start + "\n\n---\n\n:".join(contexts[: i - 1]) + prompt_end
            break
        elif i == len(contexts) - 1:
            prompt = prompt_start + "\n\n---\n\n".join(contexts) + prompt_end

    return prompt


def complete(prompt: str) -> str:
    """Generates a response to the provided prop"""

    res: Any = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0,
        max_tokens=400,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None,
    )
    return res["choices"][0]["text"].strip()


def create_embedding(text: List[str]) -> List[float]:
    """Returns an embedding vector from the provided list of strings"""

    res: Any = openai.Embedding.create(input=text, engine="text-embedding-ada-002")
    return res["data"][0]["embedding"]


if __name__ == "__main__":
    main()
