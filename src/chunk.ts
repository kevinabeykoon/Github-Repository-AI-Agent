import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkDocuments(documents: any[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  });

  const chunks = [];

  for (const doc of documents) {
    const splitChunks = await splitter.splitText(doc.content);

    for (const chunk of splitChunks) {
      chunks.push({
        text: `
FILE: ${doc.path}

${chunk}
        `,
        path: doc.path
      });
    }
  }

  return chunks;
}