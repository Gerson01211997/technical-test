import { useCallbackApi } from 'services/hooks/useCallbackApi';
import type { getProps, postProps } from './types';

export function useApiClient() {
  const callbackApi = useCallbackApi;

  const get = async <T, K>({
    endpoint,
    queryParams,
    onError,
    onSettled,
    onSuccess,
  }: getProps<T, K>) => {
    let response: T;
    try {
      response = await callbackApi<T>(endpoint, {
        method: 'GET',
        params: {
          ...queryParams,
        },
      });
      await onSuccess?.(response);
    } catch (error) {
      onError?.(error);
      throw error;
    }
    onSettled?.();
    return response;
  };

  const post = async <T, D = Partial<T>>({ endpoint, data, onError, onSettled, onSuccess }: postProps<T, D>) => {
    let response;
    try {
      response = await callbackApi<T>(endpoint, {
        method: 'POST',
        body: data,
      });
      await onSuccess?.(response);
    } catch (error) {
      onError?.(error);
      throw error;
    }
    onSettled?.();
    return response;
  };

  return {
    get,
    post
  };
}
