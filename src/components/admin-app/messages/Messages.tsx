import React from "react";
import { useQuery } from "react-query";
import { messageType } from "../../../types/types";
import MessagesFromSelectedId from "../components/messagesFromSelectedId/MessagesFromSelectedId";
import {
  MessagesSidebar,
  User,
} from "../components/messagesSidebar/MessagesSidebar";
import { getMessagesForAdmin } from "./actions";

const Messages = () => {
  const { data, isLoading } = useQuery(
    "getMessagesForAdmin",
    getMessagesForAdmin
  );
  const [selectedId, setSelectedId] = React.useState("");
  const [messagesForSI, setMessagesForSI] = React.useState<messageType[]>([]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  React.useEffect(() => {
    if (data) {
      console.log(selectedId);
      const filteredUser = data.users.filter((user: User) => {
        return user._id === selectedId;
      });
      console.log(filteredUser[0]);
      setMessagesForSI(filteredUser[0].messagesWithAdmin);
    }
  }, [selectedId]);
  return (
    <div>
      <MessagesSidebar users={data.users} setSelectedId={setSelectedId} />
      <MessagesFromSelectedId messages={messagesForSI} />
    </div>
  );
};

export default Messages;
