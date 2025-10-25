'use client';

import { useAuth } from '../../providers/AuthProvider';
import useGetAllList from '../../services/repository/hooks/list/useGetAllList';
import VirtualizedList from '../../modules/home/listView';

export default function HomePage() {
    const { data: items, isLoading, isError } = useGetAllList();

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Lista de Productos
                    </h2>
                    <p className="text-gray-600">
                        Lista virtualizada con 2000 elementos para demostrar el rendimiento optimizado
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <VirtualizedList
                        items={items || []}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">
                        ¿Por qué usar virtualización?
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <strong>Rendimiento:</strong> Solo renderiza los elementos visibles, mejorando significativamente el rendimiento</li>
                        <li>• <strong>Memoria:</strong> Reduce el uso de memoria al no mantener todos los elementos en el DOM</li>
                        <li>• <strong>Escalabilidad:</strong> Permite manejar listas de miles de elementos sin problemas de rendimiento</li>
                        <li>• <strong>UX:</strong> Mantiene la experiencia de usuario fluida incluso con grandes cantidades de datos</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
