import axios from "axios";
export const getProducts = async (page: number, limit: number) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    page,
    limit,
  });
  try {
    const res = await axios.post("/api/products/getAll", body, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
