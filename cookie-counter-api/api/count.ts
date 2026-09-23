import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const COUNTER_KEY = "cookie-clicks";

const ALLOWED_ORIGINS = new Set([
  "https://milascholz.github.io",
  "http://localhost:3000",
]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "POST") {
    const count = await redis.incr(COUNTER_KEY);
    res.status(200).json({ count });
    return;
  }

  if (req.method === "GET") {
    const count = (await redis.get<number>(COUNTER_KEY)) ?? 0;
    res.status(200).json({ count });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
