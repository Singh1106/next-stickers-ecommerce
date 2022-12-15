import axios from "axios";
export const getMessagesForAdmin = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/api/admin/getMessagesForAdmin", config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
