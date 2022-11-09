import React from "react";
import { Button, TextInput } from "@mantine/core";
import styles from "./signup.module.css";
export const SignupForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Signup </h2>
        <h3>at next-commerce-store</h3>
      </div>
      <TextInput label="The Name" placeholder="Name entry." />
      <TextInput label="The Email" placeholder="Email entry." />
      <TextInput
        label="The Password"
        placeholder="Password entry."
        type="password"
      />
      <TextInput
        label="The Confirm Password"
        placeholder="Confirm Password entry."
        type="password"
      />
      <TextInput label="The Age" placeholder="Age entry." type="number" />
      <Button className={styles.goaheadbtn}>Go ahead.</Button>
      {/* Or you know. You can use this button.
      <Button className={styles.googlebtn}>Guggle</Button> */}
    </div>
  );
};
