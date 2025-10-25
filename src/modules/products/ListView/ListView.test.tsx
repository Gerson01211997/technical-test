import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { mockServer } from 'services/mocks/server';
import { getAllProductsMock } from 'services/repository/hooks/products/GET/useGetAllProducts/handler.msw';
import { products } from 'services/repository/hooks/products/__mocks__';
import ListView from '.';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const ListViewWithProvider = () => (
  <QueryClientProvider client={queryClient}>
    <ListView />
  </QueryClientProvider>
);

describe('ListView', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockServer.reset();
    queryClient.clear();
  });

  afterAll(() => {
    mockServer.close();
  });

  it('should display the page title', async () => {
    mockServer.use(getAllProductsMock());
    render(<ListViewWithProvider />);

    await waitFor(() => {
      expect(screen.getByText('Productos')).toBeInTheDocument();
    });
  });

  it('should display the table with correct headers', async () => {
    mockServer.use(getAllProductsMock());
    render(<ListViewWithProvider />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Nombre')).toBeInTheDocument();
      expect(screen.getByText('Precio')).toBeInTheDocument();
      expect(screen.getByText('Descripción')).toBeInTheDocument();
    });
  });

  it('should display products when loading is successful', async () => {
    mockServer.use(getAllProductsMock({ data: products }));

    render(<ListViewWithProvider />);

    await waitFor(() => {
      for (const product of products) {
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(product.id)).toBeInTheDocument();
      }
    });
  });

  it('should display error message when loading fails', async () => {
    mockServer.use(getAllProductsMock({ isError: true }));

    render(<ListViewWithProvider />);

    await waitFor(() => {
      expect(screen.getByText('Error al cargar los productos')).toBeInTheDocument();
    });
  });

  it('should display loading message while fetching data', async () => {
    mockServer.use(getAllProductsMock({ isLoading: true }));

    render(<ListViewWithProvider />);

    await waitFor(() => {
      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });
  });
});
