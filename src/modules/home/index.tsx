import useGetAllList from "@repository/hooks/list/useGetAllList";
import VirtualizedList from "./listView";
import { useTranslation } from "hooks/useTranslation";
function HomePage() {
    const { data: items, isLoading, isError } = useGetAllList();
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {t("list.title")}
                    </h2>
                    <p className="text-gray-600">
                        {t("list.description")}
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
                        {t("list.justiication.title")}
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <strong>{t("list.justiication.paragraph_1.title")}</strong> {t("list.justiication.paragraph_1.description")}</li>
                        <li>• <strong>{t("list.justiication.paragraph_2.title")}</strong> {t("list.justiication.paragraph_2.description")}</li>
                        <li>• <strong>{t("list.justiication.paragraph_3.title")}</strong> {t("list.justiication.paragraph_3.description")}</li>
                        <li>• <strong>{t("list.justiication.paragraph_4.title")}</strong> {t("list.justiication.paragraph_4.description")}</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}

HomePage.displayName = "home"

export default HomePage;
