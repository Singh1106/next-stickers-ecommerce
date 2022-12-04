import axios from "axios";

interface updateOrdersStatusType {
  userId: string;
  orders: string[];
  status: string;
}
export const updateOrdersStatus = async ({
  userId,
  orders,
  status,
}: updateOrdersStatusType) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ userId, orders, status });

  try {
    const res = await axios.post("/api/admin/updateOrdersStatus", body, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
