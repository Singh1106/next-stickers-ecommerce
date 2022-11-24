import React from "react";
import { Button, TextInput } from "@mantine/core";
import styles from "./account.module.css";
import { updateProfile } from "./actions";
import useAuthStore from "../../store";
import { toast } from "react-toastify";
const EMAIL_regEx = /\S+@\S+\.\S+/;

const Account = () => {
  const { user, setUser } = useAuthStore((state: any) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [emailDisabled, setIsEmailDisabled] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: user?.name,
    email: user?.email,
  });
  const { name, email } = formData;
  const onChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const updateProfileHandler = async () => {
    const res = await updateProfile(name, email);
    if (res?.code === 1) {
      setUser({
        ...user,
        name,
        email,
      });
      toast("User profile successfully updated");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Wanna update your profile?</h3> <h4>Came to the right place.</h4>
        </div>
        <TextInput
          label="The New Name"
          placeholder="New Name entry."
          name="name"
          onChange={onChangeHandler}
        />
        <TextInput
          label="The New Email"
          placeholder="New Email entry."
          name="email"
          onChange={onChangeHandler}
          disabled={emailDisabled}
        />
        <div className={styles.buttons}>
          <Button
            className={styles.goaheadbtn}
            color="lightblue"
            onClick={updateProfileHandler}
            disabled={!EMAIL_regEx.test(email)}
          >
            Go ahead. Update profile.
          </Button>
          <Button
            onClick={() => {
              setIsEmailDisabled(!emailDisabled);
            }}
          >
            {emailDisabled
              ? `If you really wanna change email, click here.`
              : `You can lock it again.`}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Account;
