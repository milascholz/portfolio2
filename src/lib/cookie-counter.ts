const COOKIE_COUNTER_API = "https://cookie-counter-api.vercel.app/api/count";

export async function incrementCookieClicks(): Promise<number> {
  const res = await fetch(COOKIE_COUNTER_API, { method: "POST" });
  if (!res.ok) throw new Error(`Failed to increment cookie counter: ${res.status}`);
  const data = (await res.json()) as { count: number };
  return data.count;
}
