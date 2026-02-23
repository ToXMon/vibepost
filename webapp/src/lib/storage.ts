import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type SubscriberStatus = "ACTIVE" | "UNSUBSCRIBED";

export interface PostRecord {
  id: string;
  title: string;
  contentMarkdown: string;
  authorAddress: string;
  isPaid: boolean;
  status: PostStatus;
  emailSentAt: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  ipfsCid?: string | null;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  status: SubscriberStatus;
  createdAt: string;
  updatedAt: string;
}

interface DbShape {
  posts: PostRecord[];
  subscribers: SubscriberRecord[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "vibepost.json");

async function ensureDb() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initial: DbShape = { posts: [], subscribers: [] };
    await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
  }
}

async function readDb(): Promise<DbShape> {
  await ensureDb();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as DbShape;
}

async function writeDb(db: DbShape) {
  await ensureDb();
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2), "utf-8");
}

export async function listPosts(filters?: { status?: string; authorAddress?: string }) {
  const db = await readDb();
  let posts = db.posts;
  if (filters?.status) posts = posts.filter((p) => p.status === filters.status);
  if (filters?.authorAddress) {
    const normalized = filters.authorAddress.toLowerCase();
    posts = posts.filter((p) => p.authorAddress.toLowerCase() === normalized);
  }
  return posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPost(id: string) {
  const db = await readDb();
  return db.posts.find((p) => p.id === id) ?? null;
}

export async function createPost(input: {
  title?: string;
  contentMarkdown: string;
  isPaid?: boolean;
  authorAddress: string;
  ipfsCid?: string | null;
}) {
  const db = await readDb();
  const now = new Date().toISOString();
  const post: PostRecord = {
    id: randomUUID(),
    title: input.title || "Untitled",
    contentMarkdown: input.contentMarkdown,
    authorAddress: input.authorAddress.toLowerCase(),
    isPaid: Boolean(input.isPaid),
    status: "DRAFT",
    emailSentAt: null,
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
    ipfsCid: input.ipfsCid ?? null,
  };
  db.posts.push(post);
  await writeDb(db);
  return post;
}

export async function updatePost(id: string, patch: Partial<PostRecord>) {
  const db = await readDb();
  const idx = db.posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  db.posts[idx] = {
    ...db.posts[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await writeDb(db);
  return db.posts[idx];
}

export async function deletePost(id: string) {
  const db = await readDb();
  const before = db.posts.length;
  db.posts = db.posts.filter((p) => p.id !== id);
  await writeDb(db);
  return db.posts.length < before;
}

export async function listActiveSubscribers() {
  const db = await readDb();
  return db.subscribers.filter((s) => s.status === "ACTIVE");
}

export async function upsertSubscriber(email: string) {
  const db = await readDb();
  const normalized = email.toLowerCase().trim();
  const existing = db.subscribers.find((s) => s.email === normalized);
  const now = new Date().toISOString();

  if (existing) {
    existing.status = "ACTIVE";
    existing.updatedAt = now;
    await writeDb(db);
    return { subscriber: existing, created: false };
  }

  const subscriber: SubscriberRecord = {
    id: randomUUID(),
    email: normalized,
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
  };

  db.subscribers.push(subscriber);
  await writeDb(db);
  return { subscriber, created: true };
}

export async function unsubscribeByEmail(email: string) {
  const db = await readDb();
  const normalized = email.toLowerCase().trim();
  const existing = db.subscribers.find((s) => s.email === normalized);
  if (!existing) return null;
  existing.status = "UNSUBSCRIBED";
  existing.updatedAt = new Date().toISOString();
  await writeDb(db);
  return existing;
}
