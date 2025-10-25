import ProductView from 'modules/home/listView/components/ProductView';
import type { ProductDetail } from '@repository/hooks/products/types';
import { memo } from 'react';

function Row({ product }: Readonly<{ product: ProductDetail }>) {
  const { id, name, price } = product;
  return (
    <tr key={id} className="hover:bg-gray-50">
      <td className="p-3 border-b">{id}</td>
      <td className="p-3 border-b">{name}</td>
      <td className="p-3 border-b">${price}</td>
      <td className="p-3 border-b">
        <ProductView price={price} name={name} />
      </td>
    </tr>
  );
}

export default memo(Row);
