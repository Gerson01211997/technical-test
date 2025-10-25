'use client';

import { useAuth } from "providers/AuthProvider";
import { useTranslation } from "../../hooks/useTranslation";
import { usePathname } from "next/navigation";
import { memo, } from "react"
import { COMMON_NAMESPACE } from "utils/constants";
import { ROUTES } from "utils/pageRoutes";
import { className as Styles } from "./constants";

function HeaderComponent() {

    const { user, logout } = useAuth();

    const { t } = useTranslation(COMMON_NAMESPACE)

    const handleLogout = () => {
        logout();
        window.location.href = ROUTES.LOGIN;
    }
    const pathname = usePathname()
    const isLoginPage = [ROUTES.LOGIN].includes(pathname)

    if (isLoginPage) return null;

    return (
        <header className={Styles.header}>
            <div className={Styles.container}>
                <div className={Styles.wrapper}>
                    <div className={Styles.titleSection}>
                        <h1 className={Styles.title}>
                            {t("header.title")}
                        </h1>
                    </div>

                    <div className={Styles.actions}>
                        <div className={Styles.welcome}>
                            {t("header.welcome")}, <span className={Styles.username}>{user?.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className={Styles.logoutButton}
                        >
                            {t("header.logout")}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

HeaderComponent.displayName = "Header"

export default memo(HeaderComponent)
