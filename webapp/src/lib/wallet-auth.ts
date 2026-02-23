import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "vp_session";
const NONCE_COOKIE = "vp_nonce";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function secret() {
  return process.env.AUTH_SECRET || "dev-only-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function b64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function fromB64url(input: string) {
  return Buffer.from(input, "base64url").toString("utf-8");
}

export async function issueNonce() {
  const nonce = randomBytes(16).toString("hex");
  const jar = await cookies();
  jar.set(NONCE_COOKIE, nonce, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });
  return nonce;
}

export async function getNonce() {
  const jar = await cookies();
  return jar.get(NONCE_COOKIE)?.value ?? null;
}

export async function clearNonce() {
  const jar = await cookies();
  jar.set(NONCE_COOKIE, "", { path: "/", maxAge: 0 });
}

export async function createSession(address: string) {
  const payload = JSON.stringify({
    address: address.toLowerCase(),
    exp: Date.now() + SESSION_TTL_MS,
  });
  const body = b64url(payload);
  const sig = sign(body);
  const token = `${body}.${sig}`;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}

export async function getSessionAddress() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = sign(body);
  if (sig.length !== expected.length) return null;
  const sigOk = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!sigOk) return null;

  const payload = JSON.parse(fromB64url(body)) as { address: string; exp: number };
  if (Date.now() > payload.exp) return null;
  return payload.address;
}
