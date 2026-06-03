import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  draft: boolean;
  subtitle?: string;
  readingTime?: string;
  level?: string;
};

export type Post = PostMeta & {
  content: string;
};

type PostFrontmatter = {
  title: string;
  excerpt: string;
  category: string;
  draft?: boolean;
  slug?: string;
  subtitle?: string;
  readingTime?: string;
  level?: string;
};

function listMdxFilenames(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".mdx"));
}

function readPostFile(filename: string): Post {
  const fileSlug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(postsDirectory, filename);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const frontmatter = data as PostFrontmatter;

  return {
    slug: frontmatter.slug ?? fileSlug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    category: frontmatter.category,
    draft: frontmatter.draft ?? false,
    subtitle: frontmatter.subtitle,
    readingTime: frontmatter.readingTime,
    level: frontmatter.level,
    content: content.trim(),
  };
}

export function getAllPosts(): PostMeta[] {
  return listMdxFilenames()
    .map((filename) => {
      const post = readPostFile(filename);
      const { content: _content, ...meta } = post;
      return meta;
    })
    .sort((a, b) => a.title.localeCompare(b.title, "it"));
}

export function getPostBySlug(slug: string): Post | undefined {
  const filename = `${slug}.mdx`;
  if (!listMdxFilenames().includes(filename)) {
    return undefined;
  }
  return readPostFile(filename);
}