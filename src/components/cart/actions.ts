import axios from "axios";
export const addOrders = async (orders: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const orderedAt = new Date();
  const newUpdatedOrders = orders.map((order: any) => {
    return {
      ...order,
      orderedAt,
    };
  });
  const body = JSON.stringify({ orders: newUpdatedOrders });

  try {
    const res = await axios.post("/api/users/addOrders", body, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
