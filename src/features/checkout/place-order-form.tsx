import { Button, Input } from "@shared/ui";
import { selectCartItems } from "@entities/cart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateOrderQuery } from "@entities/order";
import type { CheckoutForm } from "./types";
import { cleanPhone, formatTjPhone } from "@shared/lib";


// @comment: order not working for guests, develop order apis' for guest
export const PlaceOrderForm = () => {
  const { createProduct, loading } = useCreateOrderQuery();
  const cartItems = useSelector(selectCartItems);
  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    address: "",
  });

  const handleChange = <K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({ ...form, phone: cleanPhone(form.phone) }).then(() =>
      setTimeout(() => location.reload(), 1000)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 space-y-4"
    >
      <h2 className="text-lg font-semibold">Данные покупателя</h2>

      <Input
        type="text"
        placeholder="Имя"
        value={form.fullName}
        onChange={(value) => handleChange("fullName", value)}
        required
      />

      <Input
        type="tel"
        placeholder="Телефон"
        value={form.phone}
        onChange={(value) => handleChange("phone", formatTjPhone(value))}
        required
      />

      <textarea
        placeholder="Адрес доставки"
        value={form.address}
        onChange={(e) => handleChange("address", e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
      <Button
        type="submit"
        disabled={loading || cartItems.length === 0}
        className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 disabled:opacity-50"
      >
        {loading ? "Оформление..." : "Оформить заказ"}
      </Button>
    </form>
  );
};
