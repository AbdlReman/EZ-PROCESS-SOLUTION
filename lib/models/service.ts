import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface ServiceProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  features: string[];
  deliverables: string[];
  tools: string[];
  process: ServiceProcessStep[];
  highlight?: string;
}

export type ServiceInput = Omit<ServiceDetail, "id">;

interface ServiceDoc extends Omit<ServiceDetail, "id"> {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

async function servicesCollection() {
  const db = await getDb();
  return db.collection<ServiceDoc>("services");
}

function toService(doc: ServiceDoc): ServiceDetail {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  void createdAt;
  void updatedAt;
  return {
    id: _id!.toString(),
    ...rest,
    features: rest.features ?? [],
    deliverables: rest.deliverables ?? [],
    tools: rest.tools ?? [],
    process: rest.process ?? [],
  };
}

export async function getAllServices(): Promise<ServiceDetail[]> {
  const collection = await servicesCollection();
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(toService);
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  const collection = await servicesCollection();
  const doc = await collection.findOne({ slug });
  return doc ? toService(doc) : null;
}

export async function getServiceById(id: string): Promise<ServiceDetail | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await servicesCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toService(doc) : null;
}

export async function createService(input: ServiceInput): Promise<ServiceDetail> {
  const collection = await servicesCollection();
  const now = new Date();
  const doc: ServiceDoc = { ...input, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return toService({ ...doc, _id: result.insertedId });
}

export async function updateService(id: string, input: ServiceInput): Promise<ServiceDetail | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await servicesCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return result ? toService(result) : null;
}

export async function deleteService(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await servicesCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
