import React from "react";
import { Button, PasswordInput } from "@mantine/core";
import styles from "./passwordentryscreen.module.css";
import { login, signup } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuthStore, { UserEntryTypes } from "../../store";
import { callMailApi } from "../../utils/commonActions";

export const PasswordEntryScreen = () => {
  const router = useRouter();
  const { user, userEntryType, setIsUserLoggedIn } = useAuthStore(
    (state: any) => ({
      user: state.user,
      userEntryType: state.userEntryType,
      setIsUserLoggedIn: state.setIsUserLoggedIn,
    })
  );
  const [formData, setFormData] = React.useState({
    password: "",
  });
  const { password } = formData;

  const onChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onContinueHandler = async () => {
    if (userEntryType === UserEntryTypes.login) {
      const res = await toast.promise(login(user?.email, password), {
        pending: "Trying to take you to dashboard...",
        success: {
          render({ data }) {
            return `${data?.data?.msg}`;
          },
          icon: false,
        },
        error: "What?? An error? Please try again...",
      });
      if (res?.data?.code === 1) {
        router.push("/dashboard");
      }
      if (res?.data?.code === 2) {
        router.push("admin-app/dashboard");
      }
    }
    if (userEntryType === UserEntryTypes.register) {
      const res = await toast.promise(signup(user.email, password), {
        pending: "Trying to take you to dashboard...",
        success: {
          render({ data }) {
            return `${data?.data?.msg}`;
          },
          icon: false,
        },
        error: "What?? An error? Please try again...",
      });
      if (res?.data?.code === 1) {
        await callMailApi("signup", user?.email);
        router.push("/dashboard");
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onContinueHandler();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Next-Commerce-Store</h2>
        <h3>
          {userEntryType === 1
            ? `Welcome back, ${user?.email}`
            : `Ooooh, new user. Welcome.`}
        </h3>
        <h4>Please enter password to continue.</h4>
      </div>
      <PasswordInput
        label="The Password"
        placeholder="Password entry."
        name="password"
        type="password"
        onChange={onChangeHandler}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.goaheadbtn}
        color="lightblue"
        onClick={onContinueHandler}
      >
        Continue.
      </Button>
    </div>
  );
};
