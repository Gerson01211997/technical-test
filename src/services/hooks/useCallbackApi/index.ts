import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiError, ApiOptions } from './types';
import { TOKEN_KEY } from 'app/api/login/constants';
import { ROUTES } from 'utils/pageRoutes';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// de la siguiente manera podemos enviar siempre el token en los headers con la key de 'autorization' sin embargo, en mi caso, utilicé solo cookies de forma segura y por tal motivo, no se pueden leer por javascript sin embargo, siempre se envía en la petición

// function getCookie(name: string): string | null {
//   if (typeof document === 'undefined') return null;
//   const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
//   return match ? decodeURIComponent(match[1].trim()) : null;
// }

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = getCookie(TOKEN_KEY);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn('No se encontró auth_token en las cookies');
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, config } = error;

    if (response?.status === 401 && !config.url?.includes(ROUTES.LOGIN)) {
      if (typeof window !== 'undefined') {
        document.cookie =
          `${TOKEN_KEY}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
        window.location.href = ROUTES.LOGIN;
      }
    }

    return Promise.reject({
      message: response?.data?.message || error.message,
      status: response?.status,
      data: response?.data,
    });
  }
);

export async function useCallbackApi<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', body, params } = options;

  const config: AxiosRequestConfig = {
    method: method.toUpperCase(),
    url: endpoint,
    data: body,
    params,
  };

  try {
    const response: AxiosResponse<T> = await apiClient(config);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const apiError: ApiError = new Error(
        error.response.data?.message || 'Error en la llamada a la API'
      );
      apiError.status = error.response.status;
      throw apiError;
    } else if (error.request) {
      throw new Error('Error de conexión con el servidor');
    } else {
      throw error;
    }
  }
}
