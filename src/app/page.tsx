"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getMockProducts } from "./api/getMockProducts";

interface Product {
  product_id: number;
  product_name: string;
  description?: string;
  price: number;
  photo?: string;
}

interface MenuItemProps {
  product: Product;
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
  quantity: number;
}

const MenuItem = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  quantity,
}: MenuItemProps) => (
  <div className="flex items-start gap-4 p-4 border-b">
    <div className="w-24 h-24 relative flex-shrink-0">
      <Image
        src={product.photo || ""}
        alt={product.product_name}
        fill
        className="rounded object-cover"
      />
    </div>
    <div className="flex-1">
      <h2 className="font-bold text-lg">{product.product_name}</h2>
      {product.description && (
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
      )}
      <p className="text-gray-800 mt-2">{product.price} ₸</p>
    </div>
    <div className="flex items-center">
      {quantity ? (
        <div className="flex items-center gap-2 border p-2 rounded">
          <button
            className="px-2 text-xl"
            onClick={() => onRemoveFromCart(product.product_id)}
          >
            –
          </button>
          <span>{quantity}</span>
          <button
            className="px-2 text-xl"
            onClick={() => onAddToCart(product.product_id)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center"
          onClick={() => onAddToCart(product.product_id)}
        >
          +
        </button>
      )}
    </div>
  </div>
);

export default function Home() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const totalPrice = Object.entries(cart).reduce(
    (acc, [id, qty]) =>
      acc +
      qty * (products.find((p) => p.product_id === Number(id))?.price || 0),
    0
  );

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

        {loading ? <p>Loading...</p> : null}

        <div className="flex flex-col gap-4">
          {products
            .filter((product) =>
              product.product_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <MenuItem
                key={product.product_id}
                product={product}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                quantity={cart[product.product_id] || 0}
              />
            ))}
        </div>
      </div>

      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full flex items-center gap-2 shadow-lg">
          <span className="text-lg">🛒 {totalPrice} ₸</span>
        </div>
      )}
    </div>
  );
}
