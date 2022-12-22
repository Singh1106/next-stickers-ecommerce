import axios from "axios";
export const getUnFulfilledOrdersUsers = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/api/admin/unfulfilledorders", config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
