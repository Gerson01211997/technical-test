// eslint-disable-next-line import/no-extraneous-dependencies
import { delay, HttpResponse } from 'msw';
import { RESPONSE_STATUSES } from './constants';
import type { MiddlewareInterface } from './types';

export async function responseMiddleware<T>({ params, data, req }: MiddlewareInterface<T>) {
  const { resolver, isError, isLoading, delayTime, status } = params;

  if (isError) {
    return new HttpResponse(null, {
      status: status ?? RESPONSE_STATUSES.INTERNAL_SERVER_ERROR,
    });
  }

  if (isLoading) {
    await delay('infinite');
    return new HttpResponse(null, { status: RESPONSE_STATUSES.OK });
  }

  if (!!resolver && !!req) {
    return resolver(req);
  }

  await delay(delayTime ?? 0);

  return new HttpResponse(JSON.stringify(data), {
    status: status ?? RESPONSE_STATUSES.OK,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer test-token',
    },
  });
}
