import { useRouter } from "next/navigation";
import React from "react";
import useAuthStore from "../../store";
import { EmailEntryScreen } from "../emailEntryScreen/EmailEntryScreen";
import { getUser } from "./actions";

const WPR = (Component: any) => {
  const Auth = () => {
    const { isLoggedIn, setIsLoggedIn, reset, setUser, setCart, setOrders } =
      useAuthStore((state: any) => ({
        isLoggedIn: state.isLoggedIn,
        setIsLoggedIn: state.setIsLoggedIn,
        reset: state.reset,
        setUser: state.setUser,
        setCart: state.setCart,
        setOrders: state.setOrders,
      }));
    const router = useRouter();

    const isLoggedInChecker = async () => {
      console.log("123123");
      if (!isLoggedIn) {
        const res = await getUser();
        if (res?.code !== 1) {
          reset();
          router.push("/");
        }
        setUser({
          name: res?.user.name,
          email: res?.user.email,
        });
        setIsLoggedIn(true);
        setCart(res?.user?.cart);
        setOrders(res?.user?.orders);
      }
    };

    React.useEffect(() => {
      isLoggedInChecker();
    }, [isLoggedIn]);

    // If user is logged in, return original component
    return isLoggedIn ? <Component /> : <EmailEntryScreen />;
  };
  return Auth;
};

export default WPR;
