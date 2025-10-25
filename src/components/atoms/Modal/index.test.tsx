import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ProductModal from './index';

describe('ProductModal', () => {
  const mockOnClose = jest.fn();
  const mockChildren = <div>Test content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render anything when isOpen is false', () => {
    const { container } = render(
      <ProductModal isOpen={false} onClose={mockOnClose}>
        {mockChildren}
      </ProductModal>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render the modal when isOpen is true', () => {
    render(
      <ProductModal isOpen={true} onClose={mockOnClose}>
        {mockChildren}
      </ProductModal>,
    );

    expect(screen.getByText('Descripción del Producto')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <ProductModal isOpen={true} onClose={mockOnClose}>
        {mockChildren}
      </ProductModal>,
    );

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
