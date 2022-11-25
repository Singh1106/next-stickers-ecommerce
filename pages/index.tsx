import { useRouter } from "next/navigation";
import React from "react";
import { EmailEntryScreen } from "../src/components/emailEntryScreen/EmailEntryScreen";
import { getUser } from "../src/components/withPrivateRoute/actions";

export default function Home() {
  const router = useRouter();
  const checkUser = async () => {
    const res = await getUser();
    if (res?.code === 1) {
      router.push("/dashboard");
    }
  };
  React.useEffect(() => {
    checkUser();
  }, []);
  return <EmailEntryScreen />;
}
