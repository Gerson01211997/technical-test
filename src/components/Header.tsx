'use client';

import { useAuth } from "providers/AuthProvider";
import { useTranslation } from "../hooks/useTranslation";
import { usePathname } from "next/navigation";
import { memo, } from "react"
import { COMMON_NAMESPACE } from "utils/constants";
import { ROUTES } from "utils/pageRoutes";

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
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-900">
                            {t("header.title")}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-700">
                            {t("header.welcome")}, <span className="font-medium">{user?.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            {t("header.logout")}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(HeaderComponent)

HeaderComponent.displayName = "Header"