import type { customActionsType } from 'services/repository/services/types';

export type ExtractParams<E extends string> = E extends `${infer _}:${infer Param}/${infer Rest}`
  ? Param | ExtractParams<`/${Rest}`>
  : E extends `${infer _}:${infer Param}`
  ? Param
  : never;

export type RequiresParser<E extends string> = ExtractParams<E> extends never ? false : true;

export type ParserTyping<E extends string> = RequiresParser<E> extends true
  ? { parser: Record<ExtractParams<E>, string> }
  : { parser?: Record<string, string> };

export type getAllType<K, E extends string, T> = ParserTyping<E> & {
  queryParams?: K;
  customActions?: customActionsType<T>;
};

export type getByIdType<E extends string, T> = ParserTyping<E> & {
  id: number;
  customActions?: customActionsType<T>;
};

export type CreateType<T, E extends string, D = Partial<T>> = ParserTyping<E> & {
  data: D;
  customActions?: customActionsType<T>;
};
