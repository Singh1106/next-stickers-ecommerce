import React from "react";
import { Button, TextInput } from "@mantine/core";
import styles from "./loginform.module.css";
import useAuthStore from "../../store";
import { login } from "./actions";

export const LoginForm = () => {
  const user = useAuthStore((state: any) => state.user);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onLoginHandler = () => {
    login(email, password);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>LOGIN </h2>
        <h3>at next-commerce-store</h3>
      </div>
      <TextInput
        label="The Email"
        placeholder="Email entry."
        name="email"
        onChange={onChangeHandler}
      />
      <TextInput
        label="The Password"
        placeholder="Password entry."
        type="password"
        name="password"
        onChange={onChangeHandler}
      />
      <Button className={styles.goaheadbtn} onClick={onLoginHandler}>
        Go ahead.
      </Button>
      {/* Or you know. You can use this button.
      <Button className={styles.googlebtn}>Guggle</Button> */}
    </div>
  );
};
