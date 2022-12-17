import React from "react";
import { useQuery } from "react-query";
import { messageType } from "../../../types/types";
import MessagesFromSelectedId from "../components/messagesFromSelectedId/MessagesFromSelectedId";
import {
  MessagesSidebar,
  User,
} from "../components/messagesSidebar/MessagesSidebar";
import { getMessagesForAdmin } from "./actions";
import styles from "./messages.module.css";

const Messages = () => {
  const { data, isLoading } = useQuery(
    "getMessagesForAdmin",
    getMessagesForAdmin
  );
  const [selectedId, setSelectedId] = React.useState("");
  const [messagesForSI, setMessagesForSI] = React.useState<messageType[]>([]);
  React.useEffect(() => {
    if (data?.users) {
      const filteredUser = data.users.filter((user: User) => {
        return user._id === selectedId;
      });
      if (filteredUser.length > 0) {
        setMessagesForSI(filteredUser[0].messagesWithAdmin);
      }
    }
  }, [selectedId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.messages}>
      <MessagesSidebar users={data.users} setSelectedId={setSelectedId} />
      {selectedId && (
        <MessagesFromSelectedId
          messages={messagesForSI}
          setMessages={setMessagesForSI}
          selectedId={selectedId}
          email="staticemail"
        />
      )}
    </div>
  );
};

export default Messages;
