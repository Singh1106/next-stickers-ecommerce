import axios from "axios";

export const sendVerificationEmail = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`/api/mail/verifyEmail`, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
