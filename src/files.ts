import fs from "fs";
import path from "path";

const ignoredDirs = [
  "node_modules",
  ".git",
  "dist",
  "build",
];

const allowedExtensions = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".md",
];

export function getAllFiles(dir: string): string[] {
  let results: string[] = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (ignoredDirs.includes(file)) continue;

      results = results.concat(getAllFiles(fullPath));
    } else {
      const ext = path.extname(file);

      if (allowedExtensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}