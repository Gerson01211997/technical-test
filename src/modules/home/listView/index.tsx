import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import ListItemComponent from './components/rows';
import { VirtualizedListProps } from './types';

function VirtualizedList({ items, isLoading, isError }: Readonly<VirtualizedListProps>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 110,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando lista...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error al cargar la lista</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={parentRef}
        className="h-96 overflow-auto border border-gray-200 rounded-lg"
        style={{
          contain: 'strict',
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ListItemComponent item={items[virtualItem.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualizedList;

VirtualizedList.displayName = "VirtualizedList-Component"