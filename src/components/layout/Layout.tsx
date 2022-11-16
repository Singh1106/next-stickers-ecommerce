import React from "react";
import useAuthStore from "../../store";
import { HeaderMegaMenu } from "../header/HeaderMegaMenu";
import { getUser } from "./actions";
import { useRouter } from "next/navigation";
interface LayoutProps {
  children: any;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useAuthStore((state: any) => ({
    setUser: state.setUser,
    setIsLoggedIn: state.setIsLoggedIn,
  }));
  const getAndSetUser = async () => {
    const res = await getUser();
    if (res?.code === 1) {
      setUser({
        name: res?.user.name,
        email: res?.user.email,
        age: res?.user.age,
      });
      setIsLoggedIn(true);
    } else {
      router.push("/");
    }
  };
  React.useEffect(() => {
    getAndSetUser();
  }, []);
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
}
