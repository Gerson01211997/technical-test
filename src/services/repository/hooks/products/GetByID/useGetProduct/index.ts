import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { GET_PRODUCT_QUERY_KEY } from '@repository/hooks/products/constants';
import type { ProductDetail } from '@repository/hooks/products/types';
import { useProductRepository } from '@repository/repositories/ProductsRepository/GetByID/ProductRepository';

export default function useGetProduct(id: string, options?: UseQueryOptions<ProductDetail>) {
  const queryKey = options?.queryKey ?? GET_PRODUCT_QUERY_KEY;
  const { getById } = useProductRepository();

  const parser = {
    id: +id,
  };

  return useQuery<ProductDetail>({
    queryKey: [queryKey],
    queryFn: () => getById({ ...parser }),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    ...options,
  });
}
