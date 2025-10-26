import type { MockRequest } from 'services/mocks/handlers/types';

import { responseMiddleware } from 'services/mocks/ctx/responseMiddleware';
import { mockMethods } from 'services/mocks/serverUtils';
import { ENDPOINTS } from 'services/repository/repositories/services.routes';
import type { LoginResponse } from '../types';
import { environment } from 'services/config/environment';

const { POST } = mockMethods;

const {
  remotes: { baseUrl },
} = environment;

const loginResponse: LoginResponse = {
  token: 'fake-token-test-123456789',
};

export const loginMock = ({ data, ...params }: MockRequest<Partial<LoginResponse>> = {}) => {
  return POST({
    path: `${baseUrl}${ENDPOINTS.AUTH.LOGIN}`,
    resolver: ({ request }) => {
      return responseMiddleware({
        params,
        data: loginResponse,
        req: request,
      });
    },
  });
};
