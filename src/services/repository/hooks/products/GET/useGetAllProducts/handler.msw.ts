import type { MockRequest } from 'services/mocks/handlers/types';

import { responseMiddleware } from 'services/mocks/ctx/responseMiddleware';
import { mockMethods } from 'services/mocks/serverUtils';
import { productsPath } from '@repository/hooks/products/services.routes';
import { products } from '@repository/hooks/products/__mocks__';
import type { ProductList } from '@repository/hooks/products/types';

const { GET } = mockMethods;

export const getAllProductsMock = ({ data, ...params }: MockRequest<Partial<ProductList>> = {}) => {
  return GET({
    path: productsPath,
    resolver: ({ request }) => {
      return responseMiddleware({
        params,
        data: products,
        req: request,
      });
    },
  });
};
