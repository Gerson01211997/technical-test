import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { User } from '../types';
import { useGetUserDataRepository } from 'services/repository/repositories/AuthRepository/getUserRepository';

const GET_USER_QUERY_KEY = 'get-user-data';

export default function useGetUser(options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>) {
  const { getAll } = useGetUserDataRepository();

  return useQuery<User>({
    queryKey: [GET_USER_QUERY_KEY],
    queryFn: () => getAll({}),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    ...options,
  });
}
