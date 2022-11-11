import React from "react";
import styles from "./dashboard.module.css";
import { getUser, logout } from "./actions";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/index";
import Link from "next/link";

export const Dashboard = () => {
  const router = useRouter();

  const { user, setUser } = useAuthStore((state: any) => state);
  const getAndSetUser = async () => {
    const res = await getUser();
    if (res) {
      setUser({
        name: res.name,
        email: res.email,
        age: res.age,
      });
    } else {
      router.push("/");
    }
  };
  const logoutHandler = () => {
    logout();
    setUser(null);
    router.push("/");
  };
  React.useEffect(() => {
    getAndSetUser();
  }, []);
  return (
    <div className={styles.container}>
      Hello ji, Dashboard is here. {user?.name}
      <button onClick={logoutHandler}>Here, Log yourself out.</button>
    </div>
  );
};
