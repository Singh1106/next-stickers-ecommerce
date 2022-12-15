import React from "react";
import { messageType } from "../../../../types/types";

interface Props {
  messages: messageType[];
}

const MessagesFromSelectedId = ({ messages }: Props) => {
  console.log(messages);
  return <div>{JSON.stringify(messages)}</div>;
};

export default MessagesFromSelectedId;
