import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  /** Sanitized HTML authored via the admin rich text editor */
  content: string;
}

export type BlogPostInput = Omit<BlogPost, "id">;

interface BlogDoc extends Omit<BlogPost, "id"> {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

async function blogCollection() {
  const db = await getDb();
  return db.collection<BlogDoc>("blogs");
}

function toBlogPost(doc: BlogDoc): BlogPost {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  void createdAt;
  void updatedAt;
  return { id: _id!.toString(), ...rest };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const collection = await blogCollection();
  const docs = await collection.find().sort({ date: -1 }).toArray();
  return docs.map(toBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const collection = await blogCollection();
  const doc = await collection.findOne({ slug });
  return doc ? toBlogPost(doc) : null;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await blogCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toBlogPost(doc) : null;
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const collection = await blogCollection();
  const now = new Date();
  const doc: BlogDoc = { ...input, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return toBlogPost({ ...doc, _id: result.insertedId });
}

export async function updateBlogPost(id: string, input: BlogPostInput): Promise<BlogPost | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await blogCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return result ? toBlogPost(result) : null;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await blogCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
