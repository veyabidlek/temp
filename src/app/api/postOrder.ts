import axios from "axios";
import { Product } from "../types";

export async function handleOrder(
  cart: { [key: number]: number },
  products: Product[]
) {
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

  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/order`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error
        throw new Error(`Ошибка сервера: ${error.response.status}`);
      } else if (error.request) {
        // Request made but no response
        throw new Error("Сервер не отвечает. Попробуйте позже.");
      } else {
        // Error setting up request
        throw new Error(`Ошибка: ${error.message}`);
      }
    } else {
      // Non-axios error
      throw new Error("Произошла неизвестная ошибка");
    }
  }
}
