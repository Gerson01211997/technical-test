import type { UseQueryOptions } from '@tanstack/react-query';

export type customActionsType<R> = {
  onSuccess?: (data: R) => Promise<void> | void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
};

export type getProps<T, K> = customActionsType<T> & {
  endpoint: string;
  queryParams?: K;
};

export type postProps<T, D = Partial<T>> = customActionsType<T> & {
  endpoint: string;
  data: D;
};

export type deleteProps<T> = customActionsType<T> & {
  endpoint: string;
};

export type patchProps<T> = customActionsType<T> & {
  endpoint: string;
  data: Partial<T>;
};

export type CustomQueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn' | 'meta'>;