import { useRouter } from "next/router";
import EmailVerificationResult from "../../src/components/emailVerificationResult/EmailVerificationResult";

const EmailVerificationResultPage = () => {
  const router = useRouter();
  const verificationCode = router.query.verificationCode;
  return <EmailVerificationResult code={verificationCode} />;
};
export default EmailVerificationResultPage;
