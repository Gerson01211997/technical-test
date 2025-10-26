import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { mockServer } from 'services/mocks/server';
import { loginMock } from './handler.msw';
import useLogin from '.';

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

describe('useLogin', () => {
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

  it('When login is successful', async () => {
    mockServer.use(loginMock());

    const { result } = renderHook(() => useLogin(), {
      wrapper,
    });

    result.current.mutate({
      email: 'test@test.com',
      password: '1234',
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
  });

  it('When login fails', async () => {
    mockServer.use(loginMock({ isError: true }));

    const { result } = renderHook(() => useLogin(), {
      wrapper,
    });

    result.current.mutate({
      email: 'test@test.com',
      password: '1234',
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
  });
});
