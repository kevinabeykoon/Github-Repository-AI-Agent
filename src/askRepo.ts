import OpenAI from "openai";
import { retrieveRelevantChunks } from "@/retrieve";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askRepo(
  repoName: string,
  question: string
) {
  const chunks = await retrieveRelevantChunks(
    repoName,
    question
  );

  const context = chunks.join("\n\n");

  const prompt = `
You are a senior software engineer helping explain a GitHub repository.

Only answer using the provided repository context.

If the answer is unclear, say you do not know.

Repository Context:
${context}

User Question:
${question}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.choices[0].message.content;
}