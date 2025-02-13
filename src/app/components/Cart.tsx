interface CartProps {
  cart: { [key: number]: number };
  products: { product_id: number; price: number }[];
}

const Cart = ({ cart, products }: CartProps) => {
  const totalPrice = Object.entries(cart).reduce(
    (acc, [id, qty]) =>
      acc +
      qty * (products.find((p) => p.product_id === Number(id))?.price || 0),
    0
  );

  return (
    Object.keys(cart).length > 0 && (
      <div className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full flex items-center gap-2 shadow-lg">
        <span className="text-lg">🛒 {totalPrice} ₸</span>
      </div>
    )
  );
};

export default Cart;
