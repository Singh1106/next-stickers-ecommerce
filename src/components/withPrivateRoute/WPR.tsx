import { useRouter } from "next/navigation";
import React from "react";
import useAuthStore from "../../store";
import { EmailEntryScreen } from "../emailEntryScreen/EmailEntryScreen";
import { getUser } from "./actions";

const WPR = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const {
      isLoggedIn,
      setIsLoggedIn,
      reset,
      setUser,
      setCart,
      setOrders,
      user,
    } = useAuthStore((state: any) => ({
      isLoggedIn: state.isLoggedIn,
      setIsLoggedIn: state.setIsLoggedIn,
      reset: state.reset,
      setUser: state.setUser,
      setCart: state.setCart,
      setOrders: state.setOrders,
      user: state.user,
    }));
    const tryToGetUser = async () => {
      const res = await getUser();
      if (res?.code !== 1) {
        reset();
        return router.push("/");
      }
      setUser({
        name: res?.user.name,
        email: res?.user.email,
        verifiedEmail: res?.user.verifiedEmail,
      });
      setIsLoggedIn(true);
      setCart(res?.user?.cart);
      setOrders(res?.user?.orders);
    };
    const emailVerificationChecker = () => {
      if (user && !user?.verifiedEmail) {
        return router.push("/emailVerification");
      }
    };
    const privacyChecker = async () => {
      if (!isLoggedIn) {
        await tryToGetUser();
      }
      emailVerificationChecker();
    };

    React.useEffect(() => {
      privacyChecker();
    }, [isLoggedIn]);

    // If user is logged in, return original component
    return isLoggedIn ? <Component {...props} /> : <EmailEntryScreen />;
  };
  return Auth;
};

export default WPR;
