import { baseApi } from "@shared/api";
import type { Category } from "@entities/category";

export const categoryApi = {
  getAll: () => baseApi.get<Category[]>("/categories"),

  getById: (id: string) => baseApi.get<Category>(`/categories/${id}`),
};
