import Image from "next/image";
import { Product } from "../types";

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

export default MenuItem;
