import { ENDPOINTS } from '@repository/repositories/services.routes';
import { useBaseRepository } from '@repository/repositories/BaseRepository';
import type { ProductDetail } from '@repository/hooks/products/types';

export function useProductRepository() {
  const url = ENDPOINTS.PRODUCTS.DETAIL;
  const productsRepo = useBaseRepository<ProductDetail, undefined, typeof url>(url);

  return {
    ...productsRepo,
  };
}
