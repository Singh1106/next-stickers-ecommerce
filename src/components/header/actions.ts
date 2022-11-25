import axios from "axios";
export const logout = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/users/logout", config);
    return res;
  } catch (err) {
    console.log(err);
  }
};
