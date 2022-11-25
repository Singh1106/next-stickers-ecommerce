import axios from "axios";
export const getUser = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/users/getUser", config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
