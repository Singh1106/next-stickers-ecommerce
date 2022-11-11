import React from "react";
import { Button, TextInput } from "@mantine/core";
import styles from "./signup.module.css";
import { signup } from "./actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    age: 18,
  });
  const { name, email, password, password2, age } = formData;
  const onChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSignupHandler = async () => {
    if (password === password2) {
      const status = await signup(email, password, name, age);
      if (status === 201) {
        router.push("/");
      }
    }
    return;
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Signup </h2>
          <h3>at next-commerce-store</h3>
        </div>
        <TextInput
          label="The Name"
          placeholder="Name entry."
          name="name"
          onChange={onChangeHandler}
        />
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
        <TextInput
          label="The Confirm Password"
          placeholder="Confirm Password entry."
          type="password"
          name="password2"
          onChange={onChangeHandler}
        />
        <TextInput
          label="The Age"
          placeholder="Age entry."
          type="number"
          name="age"
          onChange={onChangeHandler}
        />
        <Button className={styles.goaheadbtn} onClick={onSignupHandler}>
          Go ahead.
        </Button>
        {/* Or you know. You can use this button.
      <Button className={styles.googlebtn}>Guggle</Button> */}
      </div>
      <Link href="/">Our user?</Link>
    </>
  );
};
