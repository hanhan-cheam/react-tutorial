// lib/httpClient.ts

type HttpOptions = {
  params?: Record<string, string | number | boolean | undefined>;
  headers?: HeadersInit;
};

function buildQuery(params?: HttpOptions["params"]) {
  if (!params) return "";
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      search.append(key, String(value));
    }
  });

  return `?${search.toString()}`;
}

async function request<T>(
  url: string,
  options: RequestInit & HttpOptions = {}
): Promise<{ data: T }> {
  const { params, headers, ...rest } = options;

  const query = buildQuery(params);

  const res = await fetch(`${url}${query}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = (await res.json()) as T;

  return { data };
}

export const httpClient = {
  get: <T>(url: string, options?: HttpOptions) =>
    request<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body?: unknown, options?: HttpOptions) =>
    request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body?: unknown, options?: HttpOptions) =>
    request<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};