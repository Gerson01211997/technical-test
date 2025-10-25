import { ListItem } from "@repository/hooks/list/__mocks__";

export interface VirtualizedListProps {
    items: ListItem[];
    isLoading?: boolean;
    isError?: boolean;
}