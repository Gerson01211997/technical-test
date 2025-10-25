import Image from "next/image";
import { ListItem } from "services/repository/hooks/list/__mocks__";
import ProductView from "../ProductView";

function ListItemComponent({ item }: { item: ListItem }) {
    return (
        <div className="grid grid-cols-[auto_1fr] items-center p-4 border-b border-gray-200 hover:bg-gray-50">
            <div className="relative w-16 h-16 mr-4">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="64px"
                />
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center w-full gap-4">
                <div className="min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                        {item.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                        <span className="text-sm text-gray-500">{item.category}</span>
                        <span className="text-sm font-medium text-green-600">${item.price}</span>
                    </div>
                </div>

                <ProductView price={item.price} name={item.title} />
            </div>
        </div>
    );
}

export default ListItemComponent;

ListItemComponent.displayName = "Row-element";
