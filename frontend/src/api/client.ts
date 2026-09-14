export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const BASE_URL = "/api";

export interface ApiEnvelope<T> {
  status: "ok";
  data: T;
  total?: number;
}

async function request<T>(path: string, init?: RequestInit): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = undefined;
  }

  if (!res.ok) {
    const errBody = body as { code?: string; message?: string; details?: Record<string, unknown> } | undefined;
    throw new ApiError(res.status, errBody?.code ?? "UNKNOWN_ERROR", errBody?.message ?? res.statusText, errBody?.details);
  }

  return body as ApiEnvelope<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
};
