import Image from "next/image";
import { ListItem } from "@repository/hooks/list/__mocks__";
import ProductView from "../ProductView";
import { className as Styles } from "./constants";

function ListItemComponent({ item }: { item: ListItem }) {
    return (
        <div className={Styles.container}>
            <div className={Styles.imageWrapper}>
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={Styles.image}
                    sizes="64px"
                />
            </div>

            <div className={Styles.contentWrapper}>
                <div className={Styles.content}>
                    <h3 className={Styles.title}>
                        {item.title}
                    </h3>
                    <p className={Styles.description}>
                        {item.description}
                    </p>
                    <div className={Styles.info}>
                        <span className={Styles.category}>{item.category}</span>
                        <span className={Styles.price}>${item.price}</span>
                    </div>
                </div>

                <ProductView price={item.price} name={item.title} />
            </div>
        </div>
    );
}

ListItemComponent.displayName = "Row-element";

export default ListItemComponent;

