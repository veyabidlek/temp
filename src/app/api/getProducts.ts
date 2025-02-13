import axios from "axios";

export const getProducts = async function () {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/product/list`);
    return response.data;
  } catch (err) {
    console.error("Error getting products: ", err);
    return [];
  }
};
