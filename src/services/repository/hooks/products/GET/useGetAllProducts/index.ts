import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useProductsListRepository } from '@repository/repositories/ProductsRepository/GET/ProductsListRepository';
import { GET_ALL_PRODUCTS_QUERY_KEY } from '@repository/hooks/products/constants';
import type { ProductList } from '@repository/hooks/products/types';

export default function useGetAllProducts(options?: UseQueryOptions<ProductList>) {
  const queryKey = options?.queryKey ?? GET_ALL_PRODUCTS_QUERY_KEY;
  const { getAll } = useProductsListRepository();

  return useQuery<ProductList>({
    queryKey: [queryKey],
    queryFn: () => getAll({}),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    ...options,
  });
}
