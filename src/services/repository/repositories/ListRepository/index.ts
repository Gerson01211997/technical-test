import type { ListItem } from 'services/repository/hooks/list/__mocks__';
import { ENDPOINTS } from '../services.routes';
import { useBaseRepository } from '../BaseRepository';

export function useListRepository() {
  const url = ENDPOINTS.LIST;
  const productsRepo = useBaseRepository<ListItem[], undefined, typeof url>(url);

  return {
    ...productsRepo,
  };
}
