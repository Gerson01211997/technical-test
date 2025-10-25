import { ENDPOINTS } from '@repository/repositories/services.routes';
import { useBaseRepository } from '@repository/repositories/BaseRepository';
import type { ProductList } from '@repository/hooks/products/types';

export function useProductsListRepository() {
  const url = ENDPOINTS.PRODUCTS.LIST;
  const productsRepo = useBaseRepository<ProductList, undefined, typeof url>(url);

  return {
    ...productsRepo,
  };
}
