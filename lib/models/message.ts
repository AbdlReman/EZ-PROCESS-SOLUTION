import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface Message {
  id: string;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  services: string[];
  /** Where the inquiry originated: "Service", "Package", or "General" (default contact form). */
  source?: string;
  /** Name of the specific package the lead clicked "Get Started" on, if any. */
  package?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export type MessageInput = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  services: string[];
  source?: string;
  package?: string;
  message: string;
};

interface MessageDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  services: string[];
  source?: string;
  package?: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

async function messagesCollection() {
  const db = await getDb();
  return db.collection<MessageDoc>("messages");
}

function toMessage(doc: MessageDoc): Message {
  const { _id, createdAt, ...rest } = doc;
  return { id: _id!.toString(), ...rest, createdAt: createdAt.toISOString() };
}

export async function getAllMessages(): Promise<Message[]> {
  const collection = await messagesCollection();
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(toMessage);
}

export async function getUnreadMessageCount(): Promise<number> {
  const collection = await messagesCollection();
  return collection.countDocuments({ read: false });
}

export async function getMessageById(id: string): Promise<Message | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await messagesCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toMessage(doc) : null;
}

export async function createMessage(input: MessageInput): Promise<Message> {
  const collection = await messagesCollection();
  const doc: MessageDoc = { ...input, read: false, createdAt: new Date() };
  const result = await collection.insertOne(doc);
  return toMessage({ ...doc, _id: result.insertedId });
}

export async function setMessageRead(id: string, read: boolean): Promise<Message | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await messagesCollection();
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { read } },
    { returnDocument: "after" }
  );
  return result ? toMessage(result) : null;
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await messagesCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
