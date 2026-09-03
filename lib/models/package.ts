import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface ServicePackage {
  id: string;
  serviceId: string;
  serviceSlug: string;
  serviceTitle: string;
  name: string;
  price: string;
  deliveryTime?: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export type ServicePackageInput = Omit<ServicePackage, "id">;

interface PackageDoc extends Omit<ServicePackage, "id"> {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

async function packagesCollection() {
  const db = await getDb();
  return db.collection<PackageDoc>("packages");
}

function toPackage(doc: PackageDoc): ServicePackage {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  void createdAt;
  void updatedAt;
  return { id: _id!.toString(), ...rest, features: rest.features ?? [] };
}

export async function getAllPackages(): Promise<ServicePackage[]> {
  const collection = await packagesCollection();
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(toPackage);
}

export async function getPackagesByServiceId(serviceId: string): Promise<ServicePackage[]> {
  const collection = await packagesCollection();
  const docs = await collection.find({ serviceId }).sort({ createdAt: 1 }).toArray();
  return docs.map(toPackage);
}

export async function getPackageById(id: string): Promise<ServicePackage | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await packagesCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toPackage(doc) : null;
}

export async function createPackage(input: ServicePackageInput): Promise<ServicePackage> {
  const collection = await packagesCollection();
  const now = new Date();
  const doc: PackageDoc = { ...input, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return toPackage({ ...doc, _id: result.insertedId });
}

export async function updatePackage(id: string, input: ServicePackageInput): Promise<ServicePackage | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await packagesCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return result ? toPackage(result) : null;
}

export async function deletePackage(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await packagesCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
