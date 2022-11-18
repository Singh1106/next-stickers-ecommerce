import axios from "axios";
export const updateProfile = async (name: string, email: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    name,
    email,
  });
  try {
    const res = await axios.post("/api/users/updateProfile", body, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
