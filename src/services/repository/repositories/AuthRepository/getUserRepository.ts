import { ENDPOINTS } from '@repository/repositories/services.routes';
import { useBaseRepository } from '@repository/repositories/BaseRepository';
import { User } from '@repository/hooks/auth/types';

export function useGetUserDataRepository() {
  const url = ENDPOINTS.AUTH.USER;
  const getUserRepo = useBaseRepository<User, undefined, typeof url>(url);

  return {
    ...getUserRepo,
  };
}
