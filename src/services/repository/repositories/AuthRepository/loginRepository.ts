import type { LoginCredentials, LoginResponse } from '@repository/hooks/auth/types';
import { useBaseRepository } from '@repository/repositories/BaseRepository';
import { ENDPOINTS } from '@repository/repositories/services.routes';

export function useAuthRepository() {
  const url = ENDPOINTS.AUTH.LOGIN;
  const loginRepo = useBaseRepository<
    LoginResponse,
    LoginCredentials,
    typeof url,
    LoginCredentials
  >(url);

  return {
    ...loginRepo,
  };
}
