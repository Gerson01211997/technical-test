import type React from 'react';
import { createPortal } from 'react-dom';
import type { ProductModalProps } from './types';
import { memo } from 'react';

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            data-testid="close-button"
          >
            ✕
          </button>
        </div>
        <div className="prose">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default memo(ProductModal);
