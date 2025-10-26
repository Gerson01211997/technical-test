import type { ListItem } from '@repository/hooks/list/__mocks__';
import { useBaseRepository } from '@repository/repositories/BaseRepository';
import { ENDPOINTS } from '@repository/repositories/services.routes';

export function useListRepository() {
  const url = ENDPOINTS.LIST;
  const productsRepo = useBaseRepository<ListItem[], undefined, typeof url>(url);

  return {
    ...productsRepo,
  };
}
