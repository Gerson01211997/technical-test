import { useBaseRepository } from '@repository/repositories/BaseRepository';
import { ENDPOINTS } from '@repository/repositories/services.routes';

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

export function useLogoutRepository() {
  const url = ENDPOINTS.AUTH.LOGOUT;
  const logoutRepo = useBaseRepository<LogoutResponse, undefined, typeof url, undefined>(url);

  return {
    ...logoutRepo,
  };
}
