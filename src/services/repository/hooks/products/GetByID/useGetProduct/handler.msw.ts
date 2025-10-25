import type { MockRequest } from 'services/mocks/handlers/types';

import { responseMiddleware } from 'services/mocks/ctx/responseMiddleware';
import { mockMethods } from 'services/mocks/serverUtils';
import { productPath } from '@repository/hooks/products/services.routes';
import { products } from '@repository/hooks/products/__mocks__';
import type { ProductDetail } from '@repository/hooks/products/types';

const { GET } = mockMethods;

export const getProductByIdMock = ({
  data,
  ...params
}: MockRequest<Partial<ProductDetail>> = {}) => {
  return GET({
    path: productPath(),
    resolver: ({ request }) => {
      return responseMiddleware({
        params,
        data: products,
        req: request,
      });
    },
  });
};
