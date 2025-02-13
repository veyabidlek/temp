// postOrder.ts
import { Product } from "../types";

export async function handleOrder(
  cart: { [key: number]: number },
  products: Product[]
) {
  // Build array of products with counts
  const productsToOrder = Object.entries(cart).map(([id, count]) => {
    const found = products.find((p) => p.product_id === Number(id));
    return {
      product_id: Number(id),
      count,
      price: found?.price ?? 0,
      comment: "Some comment",
    };
  });

  const orderData = {
    spot_id: 1,
    phone: "+77470842103",
    products: productsToOrder,
  };

  // Attempt a real fetch, or just throw an error
  // so that we see "Failed to place order" alert.
  const response = await fetch("http://localhost:8080/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  return await response.json();
}
