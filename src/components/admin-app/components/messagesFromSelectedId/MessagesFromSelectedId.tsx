import { TextInput } from "@mantine/core";
import React from "react";
import { messageType } from "../../../../types/types";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import _ from "lodash";
import { toast } from "react-toastify";
import styles from "./messagesfromselectedid.module.css";
interface Props {
  messages: messageType[];
  selectedId: string;
  setMessages: React.Dispatch<React.SetStateAction<messageType[]>>;
  email: string;
}
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const MessagesFromSelectedId = ({
  messages,
  selectedId,
  setMessages,
  email,
}: Props) => {
  const [message, setMessage] = React.useState<messageType>({
    fromAdmin: true,
    message: "",
    sentAt: new Date(),
  });
  const handleSend = () => {
    if (message.message !== "") {
      socket.emit("sendMessageFromAdmin", message);
      setMessages([...messages, message]);
      setMessage({
        fromAdmin: true,
        message: "",
        sentAt: new Date(),
      });
    }
  };
  const onChangeHandler = (e: any) => {
    setMessage({ ...message, message: e.target.value, sentAt: new Date() });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.emit("chooseUserRoom", selectedId);
    // another juggadd. I dont know why we should keep it here, as there
    // is a useeffect going on. but eh. its working this way only.
    socket.on("newIncomingMessageToAdmin", (msgs: messageType[]) => {
      console.log(msgs);
      setMessages(msgs);
      toast.success(`Got a message from ${email}`);
    });
  };
  React.useEffect(() => {
    if (selectedId && socket) {
      socket.emit("chooseUserRoom", selectedId);
    }
  }, [selectedId]);
  React.useEffect(() => {
    socketInitializer();
  }, []);
  if (messages.length === 0) {
    return <div>Click some unread msgs bruh.</div>;
  }
  return (
    <div>
      <div className={styles.messages}>
        {messages.map((message, index) => {
          if (message.fromAdmin) {
            return (
              <div key={index} className={styles.fromAdmin}>
                {index + 1} ) From Admin:
                <br />
                <div className={styles.adminMessage}>{message.message}</div>
                <br />
              </div>
            );
          }
          return (
            <div key={index} className={styles.fromUser}>
              {index + 1} ) From You:
              <br />
              <div className={styles.userMessage}>{message.message}</div>
              <br />
            </div>
          );
        })}
      </div>
      <TextInput
        label="Type your message"
        placeholder="Message entry."
        name="message"
        radius="xl"
        value={message.message}
        onKeyDown={handleKeyDown}
        onChange={onChangeHandler}
        rightSection={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-cloud-storm"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#00b341"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
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

export default MessagesFromSelectedId;
