import bcrypt from "bcryptjs";
import type { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type UserRole = "user" | "admin";

export interface UserDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

async function usersCollection() {
  const db = await getDb();
  const collection = db.collection<UserDoc>("users");
  await collection.createIndex({ email: 1 }, { unique: true });
  return collection;
}

export async function findUserByEmail(email: string) {
  const collection = await usersCollection();
  return collection.findOne({ email: email.toLowerCase().trim() });
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const collection = await usersCollection();
  const email = input.email.toLowerCase().trim();

  const existing = await collection.findOne({ email });
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const doc: UserDoc = {
    name: input.name.trim(),
    email,
    passwordHash,
    role: "user",
    createdAt: new Date(),
  };

  const result = await collection.insertOne(doc);
  return { id: result.insertedId.toString(), ...doc };
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
