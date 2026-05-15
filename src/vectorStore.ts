type StoredChunk = {
  id: string;
  text: string;
  embedding: number[];
  path: string;
};

const memoryStore: Record<
  string,
  StoredChunk[]
> = {};

export function storeEmbedding(
  repoName: string,
  chunk: StoredChunk
) {
  if (!memoryStore[repoName]) {
    memoryStore[repoName] = [];
  }

  memoryStore[repoName].push(chunk);
}

export function getEmbeddings(
  repoName: string
) {
  return memoryStore[repoName] || [];
}