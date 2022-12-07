import { TextInput } from "@mantine/core";
import React from "react";
import styles from "./talktoadmin.module.css";

const TalkToAdmin = () => {
  const [messages, setMessages] = React.useState([]);
  const handleSend = () => {
    console.log("Hello World");
  };
  const allMessages = (() => {
    return <div>{messages}</div>;
  })();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return (
    <div className={styles.mainContainer}>
      {allMessages}
      <TextInput
        label="Type your message"
        placeholder="Message entry."
        name="message"
        radius="xl"
        onKeyDown={handleKeyDown}
        rightSection={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-cloud-storm"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#00b341"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            onClick={handleSend}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
            <polyline points="13 14 11 18 14 18 12 22" />
          </svg>
        }
      />
    </div>
  );
};

export default TalkToAdmin;
