import { useQueryClient } from '@tanstack/react-query';
import useGetAllList, { GET_ALL_LIST_QUERY_KEY } from '@repository/hooks/list/useGetAllList';

function useGetCacheData<T>() {
  const queryClient = useQueryClient();
  const queryKey = [GET_ALL_LIST_QUERY_KEY];

  const cachedData = queryClient.getQueryData<T>(queryKey);

  const { data, isLoading, isError } = useGetAllList({
    enabled: !cachedData,
  });

  const dataFetch = cachedData ?? data;

  return {
    data: dataFetch,
    isLoading,
    isError,
    isFetched: !!cachedData,
  };
}

export default useGetCacheData;
