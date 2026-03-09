import { API_BASE_URL } from "../config/env";

function joinUrl(base, path) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * JSON fetch wrapper:
 * - always sends cookies (JWT auth cookies)
 * - defaults content-type to JSON
 * - throws ApiError with parsed body (when available)
 */
export async function apiFetch(path, options = {}) {
  const url = joinUrl(API_BASE_URL, path);

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body != null) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `Request failed with status ${res.status}`;
    throw new ApiError(msg, { status: res.status, data });
  }

  return data;
}

