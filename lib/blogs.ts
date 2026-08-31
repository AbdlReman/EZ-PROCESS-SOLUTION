import blogsJson from "@/data/blogs.json";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  /** Markdown: headings (#/##), **bold**, [links](url), ![alt](/images/...), lists, blockquotes */
  content: string;
}

const data = blogsJson as { blogs: BlogPost[] };

export const blogs: BlogPost[] = data.blogs;

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogsSortedByDate(): BlogPost[] {
  return [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
