import { Button } from "@mantine/core";
import React from "react";
import useAuthStore from "../../store";
import { sendVerificationEmail } from "./actions";

const EmailVerification = () => {
  const { user } = useAuthStore((state: any) => {
    return {
      user: state.user,
    };
  });
  const [mailSent, setMailSent] = React.useState(false);
  const verifyItHandler = async () => {
    const res = await sendVerificationEmail();
    if (res?.code === 1) {
      setMailSent(true);
    }
  };
  return (
    <>
      <div>
        Oh no, seems like {user?.email} is not verified. Wanna verify it? You
        better, you cant do shit without verifying it.
      </div>
      {mailSent && <div>An email has been sent, You can verify till </div>}
      <Button onClick={verifyItHandler}>
        {mailSent && `Re`}send verification email.
      </Button>
    </>
  );
};

export default EmailVerification;
