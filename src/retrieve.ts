import cosineSimilarity
from "compute-cosine-similarity";

import { createEmbedding }
from "./embed";

import { getEmbeddings }
from "./vectorStore";

export async function retrieveRelevantChunks(
  repoName: string,
  query: string
) {
  const queryEmbedding =
    await createEmbedding(query);

  const storedChunks =
    getEmbeddings(repoName);

  const scored = storedChunks.map(
    (chunk) => ({
      ...chunk,
      score: cosineSimilarity(
        queryEmbedding,
        chunk.embedding
      )
    })
  );

  scored.sort(
    (a, b) => b.score - a.score
  );

  return scored
    .slice(0, 5)
    .map((s) => s.text);
}