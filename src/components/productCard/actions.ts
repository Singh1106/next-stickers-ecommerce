import axios from "axios";

export const getProducts = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/products", config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateCart = async (cart: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ cart });
  try {
    const res = await axios.post("/api/users/cart", body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};
