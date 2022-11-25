import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import useAuthStore from "../../store";
import { sendVerificationEmail } from "./actions";

const EmailVerification = () => {
  const router = useRouter();
  const {
    user,
    verificationMailSent,
    setVerificationMailSent,
    expiryVerificationMail,
    setExpiryVerificationMail,
  } = useAuthStore((state: any) => {
    return {
      user: state.user,
      verificationMailSent: state.verificationMailSent,
      setVerificationMailSent: state.setVerificationMailSent,
      expiryVerificationMail: state.expiryVerificationMail,
      setExpiryVerificationMail: state.setExpiryVerificationMail,
    };
  });
  React.useEffect(() => {
    if (user?.verifiedEmail) {
      router.push("/dashboard");
    }
  }, [user?.verifiedEmail]);
  const verifyItHandler = async () => {
    const res = await sendVerificationEmail();
    if (res?.code === 1) {
      setVerificationMailSent(true);
      setExpiryVerificationMail(res?.date);
    }
  };
  return (
    <>
      <div>
        Oh no, seems like {user?.email} is not verified. Wanna verify it? You
        better, you cant do shit without verifying it.
      </div>
      {verificationMailSent && (
        <div>
          An email has been sent, You can verify till {expiryVerificationMail}
        </div>
      )}
      <Button onClick={verifyItHandler}>
        {verificationMailSent && `Re`}send verification email.
      </Button>
    </>
  );
};

export default EmailVerification;
