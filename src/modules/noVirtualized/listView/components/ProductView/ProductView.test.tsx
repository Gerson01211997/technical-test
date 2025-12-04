import { fireEvent, render, screen } from '@testing-library/react';
import ProductView from './index';

describe('ProductView', () => {
  const mockProps = {
    name: 'Producto de prueba',
    price: 100,
  };

  it('renders correctly with props', () => {
    render(<ProductView {...mockProps} />);

    expect(screen.getByText('Ver Descripción')).toBeInTheDocument();
  });

  it('shows modal when button is clicked', () => {
    render(<ProductView {...mockProps} />);

    const button = screen.getByTestId('view-product-button');
    fireEvent.click(button);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', () => {
    render(<ProductView {...mockProps} />);

    const button = screen.getByText('Ver Descripción');
    fireEvent.click(button);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(screen.queryByText(mockProps.name)).not.toBeInTheDocument();
  });
});
