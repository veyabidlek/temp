// components/Cart.tsx
"use client";
import { Product } from "../types";

interface CartProps {
  cart: { [key: number]: number };
  products: Product[];
  children?: React.ReactNode; // so we can place a "View Cart" link/button inside
}

const Cart = ({ cart, products, children }: CartProps) => {
  const totalPrice = Object.entries(cart).reduce(
    (acc, [id, qty]) =>
      acc +
      qty * (products.find((p) => p.product_id === Number(id))?.price || 0),
    0
  );

  // If cart is empty, show nothing
  if (!Object.keys(cart).length) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full flex items-center gap-3 shadow-lg">
      <span className="text-lg">🛒 {totalPrice} ₸</span>
      {children}
    </div>
  );
};

export default Cart;
