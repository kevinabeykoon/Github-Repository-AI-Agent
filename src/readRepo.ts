import fs from "fs";
import path from "path";
import { glob } from "glob";

const ALLOWED_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".py",
  ".md"
];

export async function readRepoFiles(repoPath: string) {
  const files = await glob(`${repoPath}/**/*.*`, {
    ignore: [
      "**/node_modules/**",
      "**/.git/**",
      "**/dist/**",
      "**/build/**"
    ]
  });

  const documents = [];

  for (const file of files) {
    const ext = path.extname(file);

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      continue;
    }

    try {
      const content = fs.readFileSync(file, "utf-8");

      documents.push({
        path: file,
        content
      });
    } catch (error) {
      console.log("Failed reading file:", file);
    }
  }

  return documents;
}