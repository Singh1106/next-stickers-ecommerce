import React from "react";
import { Button, Group, Modal, TextInput } from "@mantine/core";
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
  const [modalOpen, setModalOpen] = React.useState(false);
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
        verifiedEmail: false,
      });
      setIsEmailDisabled(true);
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
          value={name}
          onChange={onChangeHandler}
        />
        <TextInput
          label="The New Email"
          placeholder="New Email entry."
          name="email"
          onChange={onChangeHandler}
          value={email}
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
              if (emailDisabled) {
                setModalOpen(true);
              } else {
                setIsEmailDisabled(!emailDisabled);
              }
            }}
          >
            {emailDisabled
              ? `If you really wanna change email, click here.`
              : `You can lock it again.`}
          </Button>
        </div>
      </div>
      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        size="auto"
        title="CHANGING EMAIL? AAAAAAAAAAAA"
      >
        By changing email, you will be redirected to verifying email stage, as
        this new email is unverified. I hope you understand.
        <Group className={styles.confirmModalButton}>
          <Button
            onClick={() => {
              setModalOpen(false);
              setIsEmailDisabled(!emailDisabled);
            }}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Account;
