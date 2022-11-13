import axios from "axios";

export const signup = async (
  email: string,
  password: string,
  name: string,
  age: number
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password, name, age });
  try {
    const res = await axios.post("/api/users/signup", body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};
