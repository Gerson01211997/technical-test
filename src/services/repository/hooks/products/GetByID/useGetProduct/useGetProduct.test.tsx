import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { mockServer } from 'services/mocks/server';
import { getProductByIdMock } from './handler.msw';
import useGetProduct from '.';

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

describe('use', () => {
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
  it('When get product is successful', async () => {
    mockServer.use(getProductByIdMock());

    const { result } = renderHook(() => useGetProduct('1'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
      expect(result.current.data).toBeTruthy();
    });
  });
  it('When get product is fail', async () => {
    mockServer.use(getProductByIdMock({ isError: true }));

    const { result } = renderHook(() => useGetProduct('1'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeFalsy();
      expect(result.current.isError).toBeTruthy();
    });
  });
});
