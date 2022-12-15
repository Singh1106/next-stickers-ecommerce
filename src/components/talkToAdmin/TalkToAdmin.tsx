import { TextInput } from "@mantine/core";
import React, { useEffect } from "react";
import io, { Socket } from "socket.io-client";
import styles from "./talktoadmin.module.css";
import { messageType } from "../../types/types";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { getInitialMessages } from "./actions";
import _ from "lodash";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const TalkToAdmin = () => {
  const [message, setMessage] = React.useState<messageType>({
    fromAdmin: false,
    message: "",
    sentAt: new Date(),
  });
  const [messages, setMessages] = React.useState<messageType[]>([]);
  const handleSend = () => {
    if (message.message !== "") {
      socket.emit("sendMessageToAdmin", message);
      setMessages([message, ...messages]);
      setMessage({
        fromAdmin: false,
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

  const getMessages = async () => {
    const res = await getInitialMessages();
    if (res?.code === 1) {
      setMessages(_.reverse(res.messages));
    }
  };
  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on("newIncomingMessageFromAdmin", (msg: messageType[]) => {
      console.log(msg);
      // setMessages(_.reverse(msg));
    });
  };
  useEffect(() => {
    getMessages();
    socketInitializer();
  }, []);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.messages}>
        {_.reverse(messages).map((message, index) => {
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
        onKeyDown={handleKeyDown}
        onChange={onChangeHandler}
        value={message.message}
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

export default TalkToAdmin;
