import axios from "axios";
export const callMailApi = async (type: string, email: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    type,
    email,
  });
  try {
    const res = await axios.post("/api/mail/sendmail", body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};
