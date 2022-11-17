import { Button, Text, TextInput } from "@mantine/core";
import React from "react";
import { toast } from "react-toastify";
import { changePassword } from "./actions";
import styles from "./settings.module.css";

const Settings = () => {
  const [formData, setFormData] = React.useState({
    oldP: "",
    newP: "",
    newP_Confirm: "",
  });
  const [newPasswordsMatch, setNewPasswordsMatch] = React.useState(true);
  const { oldP, newP, newP_Confirm } = formData;
  const onChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onGoAheadHandler = async () => {
    if (newPasswordsMatch) {
      const res = await changePassword(oldP, newP);
      if (res?.data.code === 1) {
        toast.success(res?.data.msg);
        setFormData({
          oldP: "",
          newP: "",
          newP_Confirm: "",
        });
        return;
      }
      toast.error(res?.data.msg);
    }
  };
  React.useEffect(() => {
    if (newP === newP_Confirm) {
      setNewPasswordsMatch(true);
    } else {
      setNewPasswordsMatch(false);
    }
  }, [newP, newP_Confirm]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Wanna change your password?</h3> <h4>Came to the right place.</h4>
      </div>
      {!newPasswordsMatch && (
        <div>
          <Text color="red" size="xs">
            Passwords do not match yr. Try again.
          </Text>
        </div>
      )}
      <TextInput
        label="The Old Password"
        placeholder="Old Password entry."
        name="oldP"
        type="password"
        value={oldP}
        onChange={onChangeHandler}
      />
      <TextInput
        label="The New Password"
        placeholder="New Password entry."
        name="newP"
        type="password"
        value={newP}
        onChange={onChangeHandler}
      />
      <TextInput
        label="The New Password Confirmation"
        placeholder="New Password Confirmation entry."
        name="newP_Confirm"
        type="password"
        value={newP_Confirm}
        onChange={onChangeHandler}
      />
      <Button
        className={styles.goaheadbtn}
        color="lightblue"
        onClick={onGoAheadHandler}
        disabled={!newPasswordsMatch}
      >
        Go ahead.
      </Button>
    </div>
  );
};

export default Settings;
