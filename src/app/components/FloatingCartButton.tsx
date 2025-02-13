"use client";
import Link from "next/link";
import { Product } from "../types";
import { ShoppingCart } from "lucide-react";
interface Props {
  cart: { [key: number]: number };
  products: Product[];
}

export default function FloatingCartButton({ cart, products }: Props) {
  // Calculate total price
  const totalPrice = Object.entries(cart).reduce((acc, [id, qty]) => {
    const product = products.find((p) => p.product_id === Number(id));
    return acc + (product?.price || 0) * qty;
  }, 0);

  // If cart is empty, hide the button
  if (!Object.keys(cart).length) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full flex items-center gap-2 shadow-lg">
      <ShoppingCart />
      <span className="text-lg"> {totalPrice} ₸</span>
      {/* Link to the Cart page */}
      <Link href="/cart">
        <button className="bg-white text-black px-2 py-1 rounded">
          View Cart
        </button>
      </Link>
    </div>
  );
}
