import React, { useEffect, useState } from "react";
import { deleteMessage } from "../helpers/api";
import { getId } from "../helpers/auth";

const Messages = (message) => {
  const d = new Date(message.message_datetime);

  const dateValue = `${d.getHours()} : ${d.getMinutes()}`;

  const [messageState, setMessageState] = useState(null);

  useEffect(() => {
    if (message.owner.id !== Number(getId())) {
      setMessageState(true);
    } else {
      setMessageState(false);
    }
  }, []);

  const clickDeletePost = (event) => {
    const messageId = Number(event.target.className);
    const confirmation = confirm("You sure you want to delete this message?");

    if (confirmation) deleteMessage(messageId);
  };

  return (
    <div className={`messageBox ${messageState ? "other" : ""}`}>
      <div
        id={message.owner.id}
        className={`message-box-container ${messageState ? "otherUser" : ""}`}
      >
        <p>{message.owner.username}</p>
        <p>{message.message_text}</p>
        <p>{dateValue}</p>
      </div>
      <div className={`delete-box ${messageState ? "other-delete" : ""}`}>
        <p className={message.id} onClick={clickDeletePost}>
          X
        </p>
      </div>
    </div>
  );
};

export default Messages;
