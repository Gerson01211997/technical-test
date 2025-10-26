import type { MockRequest } from 'services/mocks/handlers/types';

import { responseMiddleware } from 'services/mocks/ctx/responseMiddleware';
import { mockMethods } from 'services/mocks/serverUtils';
import { ENDPOINTS } from 'services/repository/repositories/services.routes';
import type { User } from '../types';
import { USER_DATA } from 'app/api/login/constants';
import { environment } from 'services/config/environment';

const { GET } = mockMethods;

const {
  remotes: { baseUrl },
} = environment;

export const getUserMock = ({ data, ...params }: MockRequest<Partial<User>> = {}) => {
  return GET({
    path: `${baseUrl}${ENDPOINTS.AUTH.USER}`,
    resolver: ({ request }) => {
      return responseMiddleware({
        params,
        data: USER_DATA,
        req: request,
      });
    },
  });
};
