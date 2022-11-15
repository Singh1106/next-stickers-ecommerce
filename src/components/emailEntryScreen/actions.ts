import axios from "axios";

export const findUserByEmail = async (email: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`/api/users/${email}`, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};
