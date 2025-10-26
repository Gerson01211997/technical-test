import useGetAllList from '@repository/hooks/list/useGetAllList';
import { useTranslation } from 'hooks/useTranslation';
import { className as Styles } from './constants';
import VirtualizedList from './listView';
function HomePage() {
  const { data: items, isLoading, isError } = useGetAllList();
  const { t } = useTranslation();

  return (
    <div className={Styles.root}>
      <main className={Styles.main}>
        <div className={Styles.headerContainer}>
          <h2 className={Styles.title}>{t('list.title')}</h2>
          <p className={Styles.description}>{t('list.description')}</p>
        </div>

        <div className={Styles.listContainer}>
          <VirtualizedList items={items || []} isLoading={isLoading} isError={isError} />
        </div>

        <div className={Styles.justificationContainer}>
          <h3 className={Styles.justificationTitle}>{t('list.justiication.title')}</h3>
          <ul className={Styles.justificationText}>
            <li>
              • <strong>{t('list.justiication.paragraph_1.title')}</strong>{' '}
              {t('list.justiication.paragraph_1.description')}
            </li>
            <li>
              • <strong>{t('list.justiication.paragraph_2.title')}</strong>{' '}
              {t('list.justiication.paragraph_2.description')}
            </li>
            <li>
              • <strong>{t('list.justiication.paragraph_3.title')}</strong>{' '}
              {t('list.justiication.paragraph_3.description')}
            </li>
            <li>
              • <strong>{t('list.justiication.paragraph_4.title')}</strong>{' '}
              {t('list.justiication.paragraph_4.description')}
            </li>
          </ul>
        </div>

        <div className={Styles.backendContainer}>
          <h3 className={Styles.backendTitle}>{t('list.backendOptimization.title')}</h3>
          <span className={Styles.backendText}>{t('list.backendOptimization.description')}</span>
        </div>
      </main>
    </div>
  );
}

HomePage.displayName = 'home';

export default HomePage;
