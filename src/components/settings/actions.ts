import axios from "axios";

export const changePassword = async (oldP: string, newP: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ oldP, newP });
  try {
    const res = await axios.post("/api/users/changePassword", body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};
