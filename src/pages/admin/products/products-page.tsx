import { useProductsQuery, type Product } from "@entities/product";
import { productTableColumns } from "./constants";
import { DataTable, EmptyState, PageHeader } from "@widgets/admin";
import { PackagePlus } from "lucide-react";

import { CreateProductModalForm, DeleteProductModal } from "@features/admin";
import { useMemo, useState } from "react";
import { Pagination } from "@shared/ui";

const AdminProductsPage = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [page, setPage] = useState(1);

  const {
    data: products,
    refetch,
    meta,
  } = useProductsQuery({
    page,
  });

  const columns = useMemo(
    () =>
      productTableColumns({
        onDelete: (product) => {
          setIsOpenDeleteModal(true);
          setSelectedProduct(product);
        },
        onEdit: () => {},
      }),
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Продукты"
        description="Управляйте товарами вашего магазина."
        action={{
          label: "Добавить продукт",
          icon: <PackagePlus size={18} />,
          onClick: () => setIsOpenCreateModal(true),
        }}
      />

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <DataTable
          data={products}
          columns={columns}
          rowKey={(p) => p.id}
          emptyState={
            <EmptyState
              title="Товаров пока нет"
              description="Вы еще не добавили ни одного товара."
              icon={<PackagePlus size={24} />}
              action={{
                label: "Добавить продукт",
                onClick: () => setIsOpenCreateModal(true),
                icon: <PackagePlus size={18} />,
              }}
            />
          }
        />
      </div>
      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={(page) => setPage(page)}
      />
      <CreateProductModalForm
        refetch={refetch}
        isOpen={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
      />
      <DeleteProductModal
        productId={selectedProduct?.id as string}
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        refetch={refetch}
      />
    </div>
  );
};

export default AdminProductsPage;
