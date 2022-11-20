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
  const { setUser, setCart, isLoggedIn, setIsLoggedIn, setOrders } =
    useAuthStore((state: any) => ({
      setUser: state.setUser,
      setCart: state.setCart,
      isLoggedIn: state.isLoggedIn,
      setIsLoggedIn: state.setIsLoggedIn,
      setOrders: state.setOrders,
    }));
  const getAndSetUser = async () => {
    const res = await getUser();
    if (res?.code === 1) {
      setUser({
        name: res?.user.name,
        email: res?.user.email,
      });
      setIsLoggedIn(true);
      setCart(res?.user?.cart);
      setOrders(res?.user?.orders);
    } else {
      setIsLoggedIn(false);
    }
  };
  React.useEffect(() => {
    if (isLoggedIn) {
      getAndSetUser();
    } else {
      router.push("/");
    }
  }, [isLoggedIn]);
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
}
