import axios from "axios";

export const getInitialMessages = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/users/getMessages", config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
