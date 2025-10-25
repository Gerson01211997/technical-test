import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import ListItemComponent from './components/rows';
import { VirtualizedListProps } from './types';
import { useTranslation } from 'hooks/useTranslation';
import { className as Styles } from './constants';

function VirtualizedList({ items, isLoading, isError }: Readonly<VirtualizedListProps>) {
  const { t } = useTranslation();
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
      <div className={Styles.loadingContainer}>
        <div className={Styles.loadingText}>{t("list.fetchStatus.loading")}</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={Styles.errorContainer}>
        <div className={Styles.errorText}>{t("list.fetchStatus.error")}</div>
      </div>
    );
  }

  return (
    <div className={Styles.container}>
      <div
        ref={parentRef}
        className={Styles.scrollContainer}
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

VirtualizedList.displayName = "VirtualizedList-Component"

export default VirtualizedList;
