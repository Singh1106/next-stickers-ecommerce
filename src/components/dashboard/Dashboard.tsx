import React from "react";
import styles from "./dashboard.module.css";
import { getUser, logout } from "./actions";
import { useRouter } from "next/navigation";
import type { User } from "../../types/types";

export const Dashboard = () => {
  const router = useRouter();

  const [user, setUser] = React.useState<User | null>(null);
  const getAndSetUser = async () => {
    const res = await getUser();
    if (res?.name) {
      setUser(res);
    } else {
      router.push("/");
    }
  };
  const logoutHandler = () => {
    logout();
    router.push("/");
  };
  React.useEffect(() => {
    if (!user) {
      getAndSetUser();
    }
  }, []);
  return (
    <div className={styles.container}>
      Hello ji, Dashboard is here.
      {user?.name}
      {/* Or you know. You can use this button.
      <Button className={styles.googlebtn}>Guggle</Button> */}
      <button onClick={logoutHandler}>Here, Log yourself out.</button>
    </div>
  );
};
