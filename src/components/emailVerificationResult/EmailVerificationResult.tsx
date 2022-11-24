import Link from "next/link";
import React from "react";
import { nowVerifyEmail } from "./actions";

const EmailVerificationResult = (props: any) => {
  const { code } = props;
  console.log(code);
  const [verified, setVerified] = React.useState(false);
  const VerifyEmail = async () => {
    const res = await nowVerifyEmail(code);
    if (res?.code === 1) {
      setVerified(true);
    }
  };
  React.useEffect(() => {
    VerifyEmail();
  }, [code]);
  if (!verified) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      Wuhooooo, You are verified. Lets go back to{" "}
      <Link href="/dashboard">dashboard(It's a link)</Link>
    </div>
  );
};

export default EmailVerificationResult;
