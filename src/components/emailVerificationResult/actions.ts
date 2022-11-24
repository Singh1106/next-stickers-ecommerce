import axios from "axios";

export const nowVerifyEmail = async (code: string) => {
  console.log(code);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    code,
  });
  try {
    const res = await axios.post(`/api/mail/nowVerifyingEmail`, body, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
