import { useMemo } from 'react';
import useGetAllProducts from 'services/repository/hooks/products/GET/useGetAllProducts';
import Row from './components/Row';

function ListView() {
  const { data, isLoading, isError } = useGetAllProducts();

  const rowRender = useMemo(
    () => data?.map((product) => <Row key={product.id} product={product} />),
    [data],
  );

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar los productos</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-900">
              <th className="p-3 text-left border-b">ID</th>
              <th className="p-3 text-left border-b">Nombre</th>
              <th className="p-3 text-left border-b">Precio</th>
              <th className="p-3 text-left border-b">Descripción</th>
            </tr>
          </thead>
          <tbody>{rowRender}</tbody>
        </table>
      </div>
    </div>
  );
}
export default ListView;
