import type React from 'react';
import { createPortal } from 'react-dom';
import type { ProductModalProps } from './types';
import { memo } from 'react';
import { className as Styles } from './constants';

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={Styles.overlay}>
      <div className={Styles.modal}>
        <div className={Styles.header}>
          <h2 className={Styles.title}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className={Styles.closeButton}
            data-testid="close-button"
          >
            ✕
          </button>
        </div>
        <div className={Styles.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default memo(ProductModal);
