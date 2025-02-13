"use client";
import { useEffect, useState } from "react";
import { getMockProducts } from "./api/getMockProducts";
import { Product } from "./types";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import { useCart } from "./components/CartContext";
import Link from "next/link";

export default function Home() {
  const { cart, setCart } = useCart(); // Use the shared cart
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <div className="px-6 md:px-48 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 min-h-screen">
        <h1 className="text-2xl font-bold">Menu</h1>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 my-4 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <MenuList
            products={products}
            search={search}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            cart={cart}
          />
        )}
      </div>

      {/* Floating Cart. Now it has a Link to /cart */}
      <Cart cart={cart} products={products}>
        <Link href="/cart"></Link>
      </Cart>
    </div>
  );
}
