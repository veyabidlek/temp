"use client";
import { Product } from "../types";
import { ShoppingCart } from "lucide-react";

interface Props {
  cart: { [key: number]: number };
  products: Product[];
  onClick: () => void; // Add onClick prop
}

export default function Cart({ cart, products, onClick }: Props) {
  // Calculate total price
  const totalPrice = Object.entries(cart).reduce((acc, [id, qty]) => {
    const product = products.find((p) => p.product_id === Number(id));
    return acc + (product?.price || 0) * qty;
  }, 0);

  // If cart is empty, hide the button
  if (!Object.keys(cart).length) return null;

  return (
    <div
      className="fixed hover:cursor-pointer bottom-6 right-6 bg-black text-white p-4 rounded-full flex items-center gap-2 shadow-lg"
      onClick={onClick} // Use the onClick prop here
    >
      <ShoppingCart />
      <span className="text-lg">{totalPrice} ₸</span>
    </div>
  );
}
