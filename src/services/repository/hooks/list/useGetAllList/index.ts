import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useListRepository } from '@repository/repositories/ListRepository';
import type { ListItem } from 'services/repository/hooks/list/__mocks__';

export const GET_ALL_LIST_QUERY_KEY = 'get-all-list';

export default function useGetAllList(options?: UseQueryOptions<ListItem[]>) {
  const queryKey = options?.queryKey ?? GET_ALL_LIST_QUERY_KEY;
  const { getAll } = useListRepository();

  return useQuery<ListItem[]>({
    queryKey: [queryKey],
    queryFn: () => getAll({}),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
