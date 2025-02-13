import MenuItem from "./MenuItem";
import { Product } from "../types";

interface MenuListProps {
  products: Product[];
  search: string;
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
  cart: { [key: number]: number };
}

const MenuList = ({
  products,
  search,
  onAddToCart,
  onRemoveFromCart,
  cart,
}: MenuListProps) => {
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      {filteredProducts.map((product) => (
        <MenuItem
          key={product.product_id}
          product={product}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          quantity={cart[product.product_id] || 0}
        />
      ))}
    </div>
  );
};

export default MenuList;
