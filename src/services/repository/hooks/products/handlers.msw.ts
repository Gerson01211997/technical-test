import { getAllProductsMock } from './GET/useGetAllProducts/handler.msw';
import { getProductByIdMock } from './GetByID/useGetProduct/handler.msw';

export const productsHandlers = [getAllProductsMock(), getProductByIdMock()];
