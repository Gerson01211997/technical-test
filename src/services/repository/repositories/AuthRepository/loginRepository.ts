import { ENDPOINTS } from '../services.routes';
import { useBaseRepository } from '../BaseRepository';
import { LoginCredentials, LoginResponse } from 'services/repository/hooks/auth/types';

export function useAuthRepository() {
    const url = ENDPOINTS.AUTH.LOGIN;
    const loginRepo = useBaseRepository<LoginResponse, LoginCredentials, typeof url, LoginCredentials>(url);

    return {
        ...loginRepo,
    };
}
