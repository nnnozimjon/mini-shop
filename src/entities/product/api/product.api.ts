import { baseApi } from "@shared/api";
import type {
  Product,
  CreateProduct,
  UpdateProduct,
  GetProductsParams,
  PaginatedProductsResponse,
} from "@entities/product";
import { buildQueryString } from "@shared/lib";

export const productApi = {
  getAll: async (
    params?: GetProductsParams
  ): Promise<PaginatedProductsResponse> => {
    const { data } = await baseApi.get<PaginatedProductsResponse>(
      "/products" + buildQueryString(params)
    );
    return data;
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await baseApi.get<Product>(`/products/${id}`);
    return data;
  },

  create: async (dto: CreateProduct): Promise<Product> => {
    const { data } = await baseApi.post<Product>("/products", dto, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  update: async (id: string, dto: UpdateProduct): Promise<Product> => {
    const { data } = await baseApi.patch<Product>(`/products/${id}`, dto);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await baseApi.delete(`/products/${id}`);
  },
};
