import { cloneRepo } from "@/ingest";
import { readRepoFiles } from "@/readRepo";
import { chunkDocuments } from "@/chunk";
import { storeEmbedding } from "@/vectorStore";
import { createEmbedding } from "@/embed";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const { repoName, repoPath } =
      await cloneRepo(url);

    const documents =
      await readRepoFiles(repoPath);

    const chunks =
      await chunkDocuments(documents);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      const embedding =
        await createEmbedding(chunk.text);

      storeEmbedding(repoName, {
        id: `chunk-${i}`,
        text: chunk.text,
        embedding,
        path: chunk.path
      });
    }

    return Response.json({
      success: true,
      repoName,
      chunksStored: chunks.length
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Ingestion failed"
      },
      {
        status: 500
      }
    );
  }
}