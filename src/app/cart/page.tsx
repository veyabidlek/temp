"use client";

import { useCart } from "../components/CartContext";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { getMockProducts } from "../api/getMockProducts";
import Link from "next/link";
import { handleOrder } from "../api/postOrder";
import { MenuIcon, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { cart, setCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optionally refetch products or store them globally
    const fetchProducts = async () => {
      try {
        const data = await getMockProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id] -= 1;
      else delete newCart[id];
      return newCart;
    });
  };

  // Compute total
  const totalPrice = Object.entries(cart).reduce((acc, [id, qty]) => {
    const product = products.find((p) => p.product_id === Number(id));
    return acc + (product?.price || 0) * qty;
  }, 0);

  // Handle ordering the entire cart
  const handleOrderAll = async () => {
    try {
      await handleOrder(cart, products);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Server might be down.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 md:px-48 bg-gray-100 min-h-screen">
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold mb-4">Ваш заказ</h1>

        {Object.keys(cart).length === 0 ? (
          <p>Вы ничего не выбрали.</p>
        ) : (
          <>
            {/* Cart Items List */}
            {Object.entries(cart).map(([id, quantity]) => {
              const product = products.find((p) => p.product_id === Number(id));
              if (!product) return null;
              return (
                <div
                  key={product.product_id}
                  className="flex items-center justify-between mb-4 border-b pb-2"
                >
                  <div>
                    <h2 className="font-bold text-lg">
                      {product.product_name}
                    </h2>
                    <p className="text-gray-700">{product.price} ₸</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(product.product_id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      –
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => addToCart(product.product_id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Total and Order Button */}
            <div className="text-right mt-4">
              <p className="text-xl font-bold">Сумма: {totalPrice} ₸</p>
              <button
                onClick={handleOrderAll}
                className="inline-flex items-center bg-black text-white px-4 py-2 rounded mt-2"
              >
                <ShoppingCart />
                <span className="ml-2">Заказать</span>
              </button>
            </div>
          </>
        )}

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black hover:font-bold transition duration-300"
          >
            <MenuIcon className="w-6 h-6" />
            <span className="ml-2">Вернуться в меню</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
