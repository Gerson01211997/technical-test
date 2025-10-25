type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, any>;
}

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}
