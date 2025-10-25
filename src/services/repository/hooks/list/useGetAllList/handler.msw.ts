import type { MockRequest } from 'services/mocks/handlers/types';

import { responseMiddleware } from 'services/mocks/ctx/responseMiddleware';
import { mockMethods } from 'services/mocks/serverUtils';
import type { ListItem } from '../__mocks__';
import { generateMockData } from '../__mocks__';
import { environment } from 'services/config/environment';
import { ENDPOINTS } from 'services/repository/repositories/services.routes';

const { GET } = mockMethods;

const {
    remotes: { baseUrl },
} = environment;

export const getAllListMock = ({ data, ...params }: MockRequest<Partial<{ items: ListItem[] }>> = {}) => {
    return GET({
        path: `${baseUrl}${ENDPOINTS.LIST}`,
        resolver: ({ request }) => {
            const mockData = generateMockData(2000);
            return responseMiddleware({
                params,
                data: mockData,
                req: request,
            });
        },
    });
};
