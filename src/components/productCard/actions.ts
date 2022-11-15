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
