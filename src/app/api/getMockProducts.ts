import axios from "axios";

export const getMockProducts = async function () {
  try {
    const response = await axios.get("/mockProducts.json");
    return response.data.mockProducts;
  } catch (err) {
    console.error("Error getting products: ", err);
    return [];
  }
};
