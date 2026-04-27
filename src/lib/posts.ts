import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  cover?: string;
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const { remark } = await import("remark");
  const remarkHtml = (await import("remark-html")).default;

  const result = await remark().use(remarkHtml, { sanitize: false }).process(content);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    cover: data.cover ?? undefined,
    contentHtml: result.toString(),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map(getPostBySlug));
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
