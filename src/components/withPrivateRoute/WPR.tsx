import { useRouter } from "next/navigation";
import React from "react";
import useAuthStore from "../../store";
import { EmailEntryScreen } from "../emailEntryScreen/EmailEntryScreen";
import { getUser } from "./actions";

const WPR = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const {
      isUserLoggedIn,
      setIsUserLoggedIn,
      reset,
      setUser,
      setCart,
      setOrders,
      user,
      setIsAdmin,
      isAdmin,
    } = useAuthStore((state: any) => ({
      isUserLoggedIn: state.isUserLoggedIn,
      setIsUserLoggedIn: state.setIsUserLoggedIn,
      reset: state.reset,
      setUser: state.setUser,
      setCart: state.setCart,
      setOrders: state.setOrders,
      user: state.user,
      setIsAdmin: state.setIsAdmin,
      isAdmin: state.isAdmin,
    }));
    let isAdminWhichIsNotState = false;
    const tryToGetUser = async () => {
      const res = await getUser();
      if (res?.code < 1) {
        reset();
        return router.push("/");
      }
      if (res?.code === 1) {
        setUser({
          name: res?.user.name,
          email: res?.user.email,
          verifiedEmail: res?.user.verifiedEmail,
        });
        setIsUserLoggedIn(true);
        setCart(res?.user?.cart);
        setOrders(res?.user?.orders);
      }
      if (res?.code === 2) {
        setUser({
          name: res?.user.name,
        });
        setIsAdmin(true);
        isAdminWhichIsNotState = true;
      }
    };
    const emailVerificationChecker = () => {
      if (user && !user?.verifiedEmail && !isAdminWhichIsNotState) {
        return router.push("/emailVerification");
      }
    };
    const privacyChecker = async () => {
      if (!isUserLoggedIn) {
        await tryToGetUser();
      }
      emailVerificationChecker();
    };

    React.useEffect(() => {
      privacyChecker();
    }, [isUserLoggedIn]);

    // If user is logged in, return original component
    return isUserLoggedIn || isAdmin ? (
      <Component {...props} />
    ) : (
      <EmailEntryScreen />
    );
  };
  return Auth;
};

export default WPR;
