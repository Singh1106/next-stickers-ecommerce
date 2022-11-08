import React from "react";
import { Button, TextInput } from "@mantine/core";
import styles from "./loginform.module.css";
export const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>LOGIN </h2>
        <h3>at next-commerce-store</h3>
      </div>
      <TextInput label="The Email" placeholder="Email entry." />
      <TextInput label="The Password" placeholder="Password entry." />
      <Button className={styles.goaheadbtn}>Go ahead.</Button>
      {/* Or you know. You can use this button.
      <Button className={styles.googlebtn}>Guggle</Button> */}
    </div>
  );
};
