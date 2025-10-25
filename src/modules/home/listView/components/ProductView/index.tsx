import ProductModal from 'components/atoms/Modal';
import type React from 'react';
import { memo, useState } from 'react';
import type { ProductViewProps } from './types';
import { useTranslation } from 'hooks/useTranslation';
import Button from 'components/atoms/Button';
import { className as Styles } from './constants';

const ProductView: React.FC<ProductViewProps> = ({ price, name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation()

  return (
    <div className={Styles.container}>
      <Button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={Styles.button}
        data-testid="view-product-button"
      >
        {t('list.viewItem.button')}
      </Button>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('list.viewItem.modal.title')}>
        <div className={Styles.modalContent}>
          <p>{name}</p>
          <p>{price}</p>
        </div>
      </ProductModal>
    </div>
  );
};

export default memo(ProductView);
