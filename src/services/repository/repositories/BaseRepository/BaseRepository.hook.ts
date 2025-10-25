import { regexValidation } from 'utils/tools';
import type { ExtractParams } from './types';

export function useReplaceUrlParams<E extends string>() {
  const replace = (urlTemplate: string, params: Record<ExtractParams<E>, string> | undefined) => {
    if (!params) return urlTemplate;
    return urlTemplate.replace(regexValidation.paramsOfUrl, (_, key: string) => {
      if (key in params) {
        return encodeURIComponent(params[key as ExtractParams<E>]);
      }
      throw new Error(`Parameter "${key}" not found in params object`);
    });
  };

  return { replace };
}
