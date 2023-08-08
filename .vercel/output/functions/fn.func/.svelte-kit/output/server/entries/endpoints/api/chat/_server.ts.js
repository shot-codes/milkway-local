import { g as getClientInstance, a as getClientInstance$1 } from "../../../../chunks/pinecone.js";
import { j as json, e as error } from "../../../../chunks/index.js";
const openaiClient = getClientInstance();
const pineconeClient = await getClientInstance$1();
const index = pineconeClient.Index("milkyway");
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const query = data.msg;
    const xq = await openaiClient.createEmbedding({
      model: "text-embedding-ada-002",
      input: String(query)
    });
    const res = await index.query({
      queryRequest: {
        topK: 1,
        vector: xq["data"]["data"][0]["embedding"],
        includeValues: false,
        includeMetadata: true
      }
    });
    const contexts = res.matches?.map((x) => {
      if (x.metadata && "text" in x.metadata) {
        return x.metadata.text;
      }
    });
    const limit = 3750;
    let prompt = "";
    if (res.matches?.[0].score && res.matches[0].score > 0.75) {
      const prompt_start = "Answer the question based on the context below.\n\nContext:\n";
      const prompt_end = `

Question: ${query}
Answer:`;
      if (contexts) {
        for (let i = 0; i < contexts.length; i++) {
          if (contexts.slice(0, i).join("\n\n---\n\n").length >= limit) {
            prompt = prompt_start + contexts.slice(0, i - 1).join("\n\n---\n\n") + prompt_end;
            break;
          } else if (i == contexts.length - 1) {
            prompt = prompt_start + contexts.join("\n\n---\n\n") + prompt_end;
          }
        }
      }
    } else {
      prompt = "You are a chatbot assistant for a website. You're goal is to answer questions about the website experience. Answer the following accordingly:\n" + String(query);
    }
    const completion = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 250
    });
    return json(completion.data.choices[0].text);
  } catch (err) {
    console.error(err);
    throw error(503, {
      message: "Error proccessing request."
    });
  }
};
export {
  POST
};
