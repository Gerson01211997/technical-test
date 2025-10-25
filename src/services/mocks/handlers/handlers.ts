import { authHandlers } from '@repository/hooks/auth/handlers.msw';
import { listHandlers } from '@repository/hooks/list/handlers.msw';

export const handlers = [...authHandlers, ...listHandlers];
