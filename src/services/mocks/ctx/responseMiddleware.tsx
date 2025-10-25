// eslint-disable-next-line import/no-extraneous-dependencies
import { delay, HttpResponse } from 'msw';
import { RESPONSE_STATUSES } from './constants';
import type { MiddlewareInterface } from './types';

const TEST_TOKEN = 'fake-token-test-123456789';

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
    return resolver({
      request: req,
      requestId: '',
    });
  }

  await delay(delayTime ?? 0);

  const response = new HttpResponse(JSON.stringify(data), {
    status: status ?? RESPONSE_STATUSES.OK,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  response.headers.set('Set-Cookie', `auth_token=${TEST_TOKEN}; Path=/; HttpOnly; SameSite=Strict`);

  return response;
}
