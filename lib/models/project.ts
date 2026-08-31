import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  detailImages?: string[];
  category: string;
  tech: string[];
  url?: string;
  features: string[];
  year?: string;
  highlight?: string;
}

export type ProjectInput = Omit<Project, "id">;

interface ProjectDoc extends Omit<Project, "id"> {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

async function projectsCollection() {
  const db = await getDb();
  const collection = db.collection<ProjectDoc>("projects");
  await collection.createIndex({ slug: 1 }, { unique: true });
  return collection;
}

function toProject(doc: ProjectDoc): Project {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  void createdAt;
  void updatedAt;
  return { id: _id!.toString(), ...rest };
}

export async function getAllProjects(): Promise<Project[]> {
  const collection = await projectsCollection();
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const collection = await projectsCollection();
  const doc = await collection.findOne({ slug });
  return doc ? toProject(doc) : null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await projectsCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toProject(doc) : null;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const collection = await projectsCollection();
  const now = new Date();
  const doc: ProjectDoc = { ...input, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return toProject({ ...doc, _id: result.insertedId });
}

export async function updateProject(id: string, input: ProjectInput): Promise<Project | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await projectsCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return result ? toProject(result) : null;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await projectsCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
