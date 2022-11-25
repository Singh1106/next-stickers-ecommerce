import axios from "axios";

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
