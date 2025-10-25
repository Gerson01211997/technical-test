import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { type LoginCredentials, type LoginResponse } from 'services/repository/hooks/auth/types';
import { useAuthRepository  } from 'services/repository/repositories/AuthRepository/loginRepository';


export default function useLogin(options?: UseMutationOptions<LoginResponse, Error, LoginCredentials>) {
    const { postMethod } = useAuthRepository();

    return useMutation<LoginResponse, Error, LoginCredentials>({
        ...options,
        mutationFn: (credentials) => postMethod({ data: credentials }),
    });
}
