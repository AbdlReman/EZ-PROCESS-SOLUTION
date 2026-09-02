import { marked } from "marked";
import { MongoClient } from "mongodb";
import blogsJson from "../data/blogs.json";
import { legacyProjects } from "./seed-data/projects";
import { legacyServices } from "./seed-data/services";

process.loadEnvFile(".env.local");

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

async function main() {
  const client = new MongoClient(uri as string);
  await client.connect();
  const db = client.db("ez_process_solution");

  const projects = db.collection("projects");
  const services = db.collection("services");
  const blogs = db.collection("blogs");
  const users = db.collection("users");
  const subscribers = db.collection("subscribers");

  await projects.createIndex({ slug: 1 }, { unique: true });
  await services.createIndex({ slug: 1 }, { unique: true });
  await blogs.createIndex({ slug: 1 }, { unique: true });
  await users.createIndex({ email: 1 }, { unique: true });
  await subscribers.createIndex({ email: 1 }, { unique: true });

  let projectCount = 0;
  for (const project of legacyProjects) {
    const now = new Date();
    await projects.updateOne(
      { slug: project.slug },
      { $set: { ...project, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true }
    );
    projectCount++;
  }

  let serviceCount = 0;
  for (const service of legacyServices) {
    const now = new Date();
    await services.updateOne(
      { slug: service.slug },
      { $set: { ...service, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true }
    );
    serviceCount++;
  }

  let blogCount = 0;
  const { blogs: legacyBlogs } = blogsJson as {
    blogs: {
      slug: string;
      title: string;
      excerpt: string;
      date: string;
      author: string;
      category: string;
      readTime: string;
      image: string;
      content: string;
    }[];
  };
  for (const post of legacyBlogs) {
    const html = await marked.parse(post.content);
    const now = new Date();
    const { content: _markdown, ...rest } = post;
    void _markdown;
    await blogs.updateOne(
      { slug: post.slug },
      { $set: { ...rest, content: html, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true }
    );
    blogCount++;
  }

  console.log(`Seeded ${projectCount} projects, ${serviceCount} services, ${blogCount} blog posts.`);
  await client.close();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
