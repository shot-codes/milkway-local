import { g as getClientInstance, a as getClientInstance$1 } from "../../../../chunks/pinecone.js";
import { j as json, e as error } from "../../../../chunks/index.js";
const openaiClient = getClientInstance();
const pineconeClient = await getClientInstance$1();
const index = pineconeClient.Index("milkyway");
const POST = async ({ request }) => {
  const data = await request.json();
  const query = data.msg;
  try {
    const xq = await openaiClient.createEmbedding({
      model: "text-embedding-ada-002",
      input: String(query)
    });
    const limit = 3750;
    let systemPrompt = "";
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
        return String(x.metadata.text);
      }
    });
    if (res.matches?.[0].score && res.matches[0].score > 0.75) {
      const prompt_start = "Answer the question based on the context below.\n\nContext:\n";
      const prompt_end = `

Question: ${query}
Answer:`;
      if (contexts) {
        for (let i = 0; i < contexts.length; i++) {
          if (contexts.slice(0, i).join("\n\n---\n\n").length >= limit) {
            systemPrompt = prompt_start + contexts.slice(0, i - 1).join("\n\n---\n\n") + prompt_end;
            break;
          } else if (i == contexts.length - 1) {
            systemPrompt = prompt_start + contexts.join("\n\n---\n\n") + prompt_end;
          }
        }
      }
    } else {
      systemPrompt = "You are a helpful assitant for the ZibraGroup website.";
    }
    const completion = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ]
    });
    return json(completion.data.choices[0].message);
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
