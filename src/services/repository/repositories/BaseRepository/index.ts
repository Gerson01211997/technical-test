import type { getAllType, getByIdType, CreateType } from './types';
import { useApiClient } from '@repository/services/useApiClient';
import { useReplaceUrlParams } from './BaseRepository.hook';

export function useBaseRepository<T, K, E extends string, D = Partial<T>>(endpoint: E) {
  const { get, post } = useApiClient();
  const { replace } = useReplaceUrlParams();

  const getAll = async ({
    queryParams,
    parser,
    customActions,
  }: getAllType<K, E, T>): Promise<T> => {
    const response = await get<T, K>({
      endpoint: replace(endpoint, parser),
      queryParams,
      ...customActions,
    });
    return response;
  };

  const getById = async ({ id, parser, customActions }: getByIdType<E, T>): Promise<T> => {
    const endpointWithId = `${endpoint}${id}/`;
    const response = await get<T, undefined>({
      endpoint: replace(endpointWithId, parser),
      ...customActions,
    });
    return response;
  };

  const postMethod = async ({ data, parser, customActions }: CreateType<T, E, D>): Promise<T> => {
    const response = await post<T, D>({
      data,
      endpoint: replace(endpoint, parser),
      ...customActions,
    });
    return response;
  };

  return { getAll, getById, postMethod };
}
