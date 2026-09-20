import { AppException } from "@shopping/domain";

/**
 * Turns a failed HTTP response into a thrown error.
 *
 * `fetch` only rejects on a network failure, a 404 or 500 still resolves normally.
 * Every repository method calls this right after `fetch`, so a bad status code ends up in the same `catch` as a real network error,
 * instead of silently continuing with an error body as if it were data.
 */
export const throwIfNotOk = async (res: Response): Promise<void> => {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const message = errorBody?.error?.message ?? "Request Failed";
    throw new AppException(message, res.status);
  }
};
