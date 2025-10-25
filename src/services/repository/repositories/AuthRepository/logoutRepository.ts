import { ENDPOINTS } from '../services.routes';
import { useBaseRepository } from '../BaseRepository';

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
