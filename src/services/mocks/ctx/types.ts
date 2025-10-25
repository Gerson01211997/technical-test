/* eslint-disable import/no-extraneous-dependencies */
import type { DefaultBodyType, ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import type { MockRequest } from 'services/mocks/handlers/types';

export interface MiddlewareInterface<T> {
  params: Omit<MockRequest<T>, 'data'>;
  data?: T;
  req?: ResponseResolverInfo<Record<string, unknown>, DefaultBodyType>;
}
