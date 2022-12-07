import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "public/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}
