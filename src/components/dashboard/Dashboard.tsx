import React from "react";
import styles from "./dashboard.module.css";
import { getUser } from "./actions";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/index";
import { NavbarMinimalColored } from "../navbar/NavbarMinimalColored";

const Dashboard = () => {
  const router = useRouter();

  const setUser = useAuthStore((state: any) => state.setUser);
  const getAndSetUser = async () => {
    const res = await getUser();
    if (res.code === 1) {
      setUser({
        name: res?.user.name,
        email: res?.user.email,
        age: res?.user.age,
      });
    } else {
      router.push("/");
    }
  };
  React.useEffect(() => {
    getAndSetUser();
  }, []);
  return <div className={styles.container}>Dashboard</div>;
};
export default Dashboard;
