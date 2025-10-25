import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { mockServer } from 'services/mocks/server';
import { logoutMock } from './handler.msw';
import useLogout from '.';

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            retry: false,
        },
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useLogout', () => {
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

    it('When logout is successful', async () => {
        mockServer.use(logoutMock());

        const { result } = renderHook(() => useLogout(), {
            wrapper,
        });

        result.current.mutate(undefined);

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });
    });

    it('When logout fails', async () => {
        mockServer.use(logoutMock({ isError: true }));

        const { result } = renderHook(() => useLogout(), {
            wrapper,
        });

        result.current.mutate(undefined);

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });
    });
});
