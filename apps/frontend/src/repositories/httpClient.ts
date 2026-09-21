import { AppException } from "@shopping/domain";

/**
 * Stops the code after it when the response failed.
 *
 * `fetch` alone does not do this, a 404 or 500 still resolves normally,
 * only a real network failure rejects. This checks `res.ok` and throws instead.
 *
 * @param res - The response to check
 */
const throwIfNotOk = async (res: Response): Promise<void> => {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const message = errorBody?.error?.message ?? "Request Failed";
    throw new AppException(message, res.status);
  }
};

/**
 * Wraps `fetch` with error checking and JSON parsing, one method per HTTP verb.
 *
 * Knows nothing about items, only URLs and bodies.
 * `HttpItemRepository` builds the actual item requests on top of this.
 */
export const httpClient = {
  async get(url: string) {
    const res = await fetch(url);
    await throwIfNotOk(res);
    return res.json();
  },

  async post(url: string, body: unknown) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    await throwIfNotOk(res);
    return res.json();
  },

  async put(url: string, body: unknown) {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    await throwIfNotOk(res);
    return res.json();
  },

  async delete(url: string) {
    const res = await fetch(url, {
      method: "DELETE",
    });
    await throwIfNotOk(res);
    return res.json();
  },
};
