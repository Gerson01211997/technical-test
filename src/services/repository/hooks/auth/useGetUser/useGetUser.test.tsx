import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { mockServer } from 'services/mocks/server';
import { getUserMock } from './handler.msw';
import useGetUser from '.';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetUser', () => {
    beforeAll(() => {
        mockServer.listen();
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockServer.reset();
    });

    afterAll(() => {
        mockServer.close();
    });

    it('When get user is successful', async () => {
        mockServer.use(getUserMock());

        const { result } = renderHook(() => useGetUser(), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
            expect(result.current.data).toBeTruthy();
        });
    });

    it('When get user fails', async () => {
        mockServer.use(getUserMock({ isError: true }));

        const { result } = renderHook(() => useGetUser(), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });
    });
});
