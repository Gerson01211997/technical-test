import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useLogoutRepository, type LogoutResponse } from '@repository/repositories/AuthRepository/logoutRepository';

export default function useLogout(options?: UseMutationOptions<LogoutResponse, Error, void>) {
    const { postMethod } = useLogoutRepository();

    return useMutation<LogoutResponse, Error, void>({
        ...options,
        mutationFn: () => postMethod({ data: undefined }),
    });
}
