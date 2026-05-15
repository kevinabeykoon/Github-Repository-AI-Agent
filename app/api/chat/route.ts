import { askRepo } from "@/askRepo";

export async function POST(req: Request) {
  try {
    const { repoName, question } =
      await req.json();

    const answer = await askRepo(
      repoName,
      question
    );

    return Response.json({
      answer
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Chat failed"
      },
      {
        status: 500
      }
    );
  }
}