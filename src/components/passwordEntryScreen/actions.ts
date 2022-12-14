import axios from "axios";

export const login = async (email: string, password: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/users/login", body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const signup = async (email: string, password: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/users/signup", body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};
