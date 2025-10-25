export const productsPath = '/api/products';
export const productPath = (id?: string) => `/api/products/${id ?? ':id'}`;
