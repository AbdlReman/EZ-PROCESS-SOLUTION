import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

interface SubscriberDoc {
  _id?: ObjectId;
  email: string;
  createdAt: Date;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function subscribersCollection() {
  const db = await getDb();
  return db.collection<SubscriberDoc>("subscribers");
}

function toSubscriber(doc: SubscriberDoc): Subscriber {
  const { _id, createdAt, ...rest } = doc;
  return { id: _id!.toString(), ...rest, createdAt: createdAt.toISOString() };
}

export async function getAllSubscribers(): Promise<Subscriber[]> {
  const collection = await subscribersCollection();
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(toSubscriber);
}

export async function getSubscriberCount(): Promise<number> {
  const collection = await subscribersCollection();
  return collection.countDocuments();
}

/** Adds one subscriber. Returns created:false if the email was already on the list. */
export async function addSubscriber(email: string): Promise<{ created: boolean }> {
  const normalized = email.trim().toLowerCase();
  if (!EMAIL_RE.test(normalized)) {
    throw new Error("Please enter a valid email address.");
  }
  const collection = await subscribersCollection();
  const result = await collection.updateOne(
    { email: normalized },
    { $setOnInsert: { email: normalized, createdAt: new Date() } },
    { upsert: true }
  );
  return { created: (result.upsertedCount ?? 0) > 0 };
}

/** Bulk import from a pasted list / CSV. Skips duplicates and invalid entries. */
export async function addSubscribersBulk(emails: string[]): Promise<{ added: number; skipped: number }> {
  const collection = await subscribersCollection();
  const seen = new Set<string>();
  let added = 0;
  let skipped = 0;

  for (const raw of emails) {
    const email = raw.trim().toLowerCase();
    if (!email || !EMAIL_RE.test(email) || seen.has(email)) {
      skipped++;
      continue;
    }
    seen.add(email);
    const result = await collection.updateOne(
      { email },
      { $setOnInsert: { email, createdAt: new Date() } },
      { upsert: true }
    );
    if ((result.upsertedCount ?? 0) > 0) {
      added++;
    } else {
      skipped++;
    }
  }

  return { added, skipped };
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await subscribersCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

export async function deleteSubscribersBulk(ids: string[]): Promise<number> {
  const objectIds = ids.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
  if (objectIds.length === 0) return 0;
  const collection = await subscribersCollection();
  const result = await collection.deleteMany({ _id: { $in: objectIds } });
  return result.deletedCount ?? 0;
}
