import { simpleGit } from "simple-git";
import fs from "fs";

export async function cloneRepo(url: string) {
  const git = simpleGit();

  const repoName = url.split("/").pop()?.replace(".git", "");

  if (!repoName) {
    throw new Error("Invalid GitHub URL");
  }

  const repoPath = `./repos/${repoName}`;

  if (!fs.existsSync("./repos")) {
    fs.mkdirSync("./repos");
  }

  if (!fs.existsSync(repoPath)) {
    await git.clone(url, repoPath);
  }

  return {
    repoName,
    repoPath
  };
}