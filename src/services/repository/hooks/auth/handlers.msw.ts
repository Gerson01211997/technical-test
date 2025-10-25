import { getUserMock } from './useGetUser/handler.msw';
import { loginMock } from './useLogin/handler.msw';
import { logoutMock } from './useLogout/handler.msw';

export const authHandlers = [getUserMock(), loginMock(), logoutMock()];
