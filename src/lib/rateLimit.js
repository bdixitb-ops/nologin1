const buckets = new Map();

/**
 * Simple in-memory rate limiter (per serverless instance).
 * Pair with Firebase Storage rules that block direct client writes.
 *
 * @param {string} key
 * @param {{ limit: number, windowMs: number }} options
 */
export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}
