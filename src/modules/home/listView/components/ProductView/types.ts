import type { ProductDetail } from '@repository/hooks/products/types';

export type ProductViewProps = Pick<ProductDetail, 'price' | 'name'>;
