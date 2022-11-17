import React from "react";
import { Button, TextInput } from "@mantine/core";
import styles from "./emailentryscreen.module.css";
import { findUserByEmail } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuthStore, { UserEntryTypes } from "../../store";

const EMAIL_regEx = /\S+@\S+\.\S+/;

export const EmailEntryScreen = () => {
  const router = useRouter();
  const { setUser, setUserEntryType } = useAuthStore((state: any) => ({
    setUser: state.setUser,
    setUserEntryType: state.setUserEntryType,
  }));
  const [formData, setFormData] = React.useState({
    email: "",
  });
  const { email } = formData;

  const onChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onEnterEmailHandler = async () => {
    const res = await toast.promise(findUserByEmail(email), {
      pending: "Wait.. Looking for you.",
      success: {
        render({ data }) {
          return `${data?.data?.msg}`;
        },
        icon: false,
      },
      error: "What?? An error? Please try again...",
    });
    if (res?.data?.code === 1) {
      setUserEntryType(UserEntryTypes.login);
    }
    if (res?.data?.code === 2) {
      setUserEntryType(UserEntryTypes.register);
    }
    setUser({
      email,
    });
    router.push("/2ndScreen");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>CONTINUE </h2>
          <h3>at next-commerce-store</h3>
        </div>
        <TextInput
          label="The Email"
          placeholder="Email entry."
          name="email"
          onChange={onChangeHandler}
        />
        <Button
          className={styles.goaheadbtn}
          color="pink"
          onClick={onEnterEmailHandler}
          disabled={!EMAIL_regEx.test(email)}
        >
          Go ahead.
        </Button>
        {/* Or you know. You can use this button.
      <Button className={styles.googlebtn}>Guggle</Button> */}
      </div>
    </>
  );
};
