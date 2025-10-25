import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { mockServer } from 'services/mocks/server';
import useGetAllProducts from '.';
import { getAllProductsMock } from './handler.msw';

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

describe('useGetAllProducts', () => {
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
  it('When get all products is successful', async () => {
    mockServer.use(getAllProductsMock());

    const { result } = renderHook(() => useGetAllProducts(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
      expect(result.current.data).toBeTruthy();
    });
  });
  it('When get all products is fail', async () => {
    mockServer.use(getAllProductsMock({ isError: true }));

    const { result } = renderHook(() => useGetAllProducts(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeFalsy();
      expect(result.current.isError).toBeTruthy();
    });
  });
});
