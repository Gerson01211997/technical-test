import ListItemComponent from './components/rows';
import { VirtualizedListProps } from './types';
import { useTranslation } from 'hooks/useTranslation';
import { className as Styles } from './constants';

function VirtualizedList({ items, isLoading, isError }: Readonly<VirtualizedListProps>) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={Styles.loadingContainer}>
        <div className={Styles.loadingText}>{t('list.fetchStatus.loading')}</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={Styles.errorContainer}>
        <div className={Styles.errorText}>{t('list.fetchStatus.error')}</div>
      </div>
    );
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.scrollContainer}>
        {items.map((item, idx) => (
          <ListItemComponent key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

VirtualizedList.displayName = 'VirtualizedList-Component';

export default VirtualizedList;
