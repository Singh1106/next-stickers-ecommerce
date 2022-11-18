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
  const { setUser, setCart, isLoggedIn, setIsLoggedIn } = useAuthStore(
    (state: any) => ({
      setUser: state.setUser,
      setCart: state.setCart,
      isLoggedIn: state.isLoggedIn,
      setIsLoggedIn: state.setIsLoggedIn,
    })
  );
  const getAndSetUser = async () => {
    const res = await getUser();
    if (res?.code === 1) {
      setUser({
        name: res?.user.name,
        email: res?.user.email,
      });
      setIsLoggedIn(true);
      setCart(res?.user?.cart);
    } else {
      router.push("/");
    }
  };
  React.useEffect(() => {
    if (!isLoggedIn) {
      getAndSetUser();
    }
  }, [isLoggedIn]);
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
}
