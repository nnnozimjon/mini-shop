export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  category?: Category | null;
  createdAt: string;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId?: string;
}

export interface UpdateProduct {
  name?: string;
  description?: string;
  price?: number;
  image?: string | null;
  categoryId?: string | null;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string | string[];
  sortBy?: "price" | "createdAt" | "name";
  order?: "ASC" | "DESC";
}

export interface PaginatedProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductColumnProps {
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}