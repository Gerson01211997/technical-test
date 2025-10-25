import { ListItem } from "services/repository/hooks/list/__mocks__";

export interface VirtualizedListProps {
    items: ListItem[];
    isLoading?: boolean;
    isError?: boolean;
}