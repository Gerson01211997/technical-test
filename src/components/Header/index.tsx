'use client';

import { useAuth } from 'providers/AuthProvider';
import { useTranslation } from '@hooks/useTranslation';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { memo } from 'react';
import { COMMON_NAMESPACE } from 'utils/constants';
import { ROUTES } from 'utils/pageRoutes';
import { className as Styles } from './constants';

function HeaderComponent() {
  const { user, logout } = useAuth();

  const { t } = useTranslation(COMMON_NAMESPACE);

  const router = useRouter();
  const { push } = router;

  const handleLogout = () => {
    logout();
    push(ROUTES.LOGIN);
  };
  const pathname = usePathname();
  const isLoginPage = [ROUTES.LOGIN].includes(pathname);

  if (isLoginPage) return null;

  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <div className={Styles.titleSection}>
            <h1 className={Styles.title}>{t('header.title')}</h1>
          </div>

          <div className={Styles.actions}>
            <div className={Styles.welcome}>
              {t('header.welcome')}, <span className={Styles.username}>{user?.name}</span>
            </div>
            <Link href="/home" passHref>
              <button className={Styles.linkButton} type="button">
                virtualizada
              </button>
            </Link>
            <Link href="/list" passHref>
              <button className={Styles.linkButton} type="button">
                No virtualizada
              </button>
            </Link>
            <button onClick={handleLogout} className={Styles.logoutButton}>
              {t('header.logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

HeaderComponent.displayName = 'Header';

export default memo(HeaderComponent);
