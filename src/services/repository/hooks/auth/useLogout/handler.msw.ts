import type { MockRequest } from 'services/mocks/handlers/types';

import { responseMiddleware } from 'services/mocks/ctx/responseMiddleware';
import { mockMethods } from 'services/mocks/serverUtils';
import { ENDPOINTS } from 'services/repository/repositories/services.routes';
import { environment } from 'services/config/environment';

const { POST } = mockMethods;

const {
    remotes: { baseUrl },
} = environment;

interface LogoutResponse {
    success: boolean;
}

const logoutResponse: LogoutResponse = {
    success: true,
};

export const logoutMock = ({ data, ...params }: MockRequest<Partial<LogoutResponse>> = {}) => {
    return POST({
        path: `${baseUrl}${ENDPOINTS.AUTH.LOGOUT}`,
        resolver: ({ request }) => {
            return responseMiddleware({
                params,
                data: logoutResponse,
                req: request,
            });
        },
    });
};
