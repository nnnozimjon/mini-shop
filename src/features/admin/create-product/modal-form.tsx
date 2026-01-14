import { useCreateProductQuery } from "@entities/product";
import type { CreateProductModalFormProps, FormState } from "./modal-form.types";
import { Input, Modal, Select } from "@shared/ui";
import { useCategoriesQuery } from "@entities/category";
import { useState, useMemo, type FormEvent } from "react";

export const CreateProductModalForm = ({
  isOpen,
  onClose,
  refetch = () => {},
}: CreateProductModalFormProps) => {
  const { categories } = useCategoriesQuery();
  const { createProduct, loading } = useCreateProductQuery();

  const [form, setForm] = useState<FormState>({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    image: null,
    preview: null,
  });

  const mappedCategories = useMemo(
    () =>
      categories?.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    [categories]
  );

  if (!isOpen) return null;

  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleChange("image", file);
    handleChange("preview", URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.title);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("categoryId", form.categoryId);
    if (form.image) fd.append("image", form.image);

    try {
      await createProduct(fd as any);
      refetch();
      clearForm();
    } catch {}
  };

  const clearForm = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      categoryId: "",
      image: null,
      preview: null,
    });
    onClose();
  };

  return (
    <Modal
      title="Создать продукт"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      action={{
        cancelLabel: 'Отменить',
        submitLabel: 'Создать'
      }}
    >
      <form className="space-y-4">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(v) => handleChange("title", v)}
          required
        />

        <Input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(v) => handleChange("price", v)}
          required
        />

        <Select
          value={form.categoryId}
          onChange={(v) => handleChange("categoryId", v)}
          options={mappedCategories}
        />

        <textarea
          className="w-full rounded-lg px-3 border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 hover:file:bg-gray-200"
          required 
        />

        {form.preview && (
          <img
            src={form.preview}
            alt="preview"
            className="w-1/2 rounded-lg object-cover"
          />
        )}
      </form>
    </Modal>
  );
};
