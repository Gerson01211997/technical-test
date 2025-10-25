import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { mockServer } from 'services/mocks/server';
import { getAllListMock } from './handler.msw';
import useGetAllList from '.';

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

describe('useGetAllList', () => {
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

    it('When get all list is successful', async () => {
        mockServer.use(getAllListMock());

        const { result } = renderHook(() => useGetAllList(), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
            expect(result.current.data).toBeTruthy();
        });
    });

    it('When get all list fails', async () => {
        mockServer.use(getAllListMock({ isError: true }));

        const { result } = renderHook(() => useGetAllList(), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });
    });
});
