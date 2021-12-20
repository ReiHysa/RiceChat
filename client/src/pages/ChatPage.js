import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FormInput from "../components/FormInput";
import Messages from "../components/Messages";
import { fetchAllMessages, fetchChat, postMessageToChat } from "../helpers/api";
import { createMessage } from "../helpers/api";

import { getId, getToken } from "../helpers/auth";
import "../styles/Chat.css";
const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState(null);
  const [chatPage, setChatPage] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [otherMessages, setOtherMessages] = useState([]);
  const [messageBox, setMessageBox] = useState(null);
  const userId = getId();

  const [everyMessage, setEveryMessage] = useState(null);
  const [allUserMessages, setAllUserMessages] = useState([]);
  const [sentMessage, setSentMessage] = useState(null);
  const navigate = useNavigate();
  const [check, setCheck] = useState(null);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetching = () => {
      fetchChat(id).then(setChatPage);
      const interval = setInterval(() => {
        fetchChat(id).then(setCheck);
      }, 1000);
      return () => clearInterval(interval);
    };
    const logCheck = () => {
      const token = getToken();
      console.log(token);
      if (token === null) {
        navigate("/login");
      }
    };
    logCheck();
    fetching();
  }, []);

  useEffect(() => {
    if (chatPage) {
      const mess = chatPage.message;
      setMessages(mess);
    }
  }, [chatPage]);

  useEffect(() => {
    if (check) {
      if (check && messages) {
        const interval = setInterval(() => {
          if (check.message.length !== messages.length) {
            window.location.reload(true);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
      if (messages !== null) {
        if (messages !== undefined) {
          setUserMessages([]);
          setOtherMessages([]);
          let i = 0;
          for (i = 0; i < messages.length; i++) {
            const owning = messages[i].owner.id;

            if (owning === Number(userId)) {
              userMessages.push(messages[i]);
            } else {
              otherMessages.push(messages[i]);
            }
          }
        } else {
          window.location.reload(true);
        }
      }
    }
    console.log(userMessages, "OWNER");
  }, [messages, check]);

  useEffect(() => {
    if (everyMessage) {
      console.log(everyMessage, "every Message");

      setAllUserMessages([]);

      let i = 0;
      for (i = 0; i < everyMessage.length; i++) {
        const userMessage = everyMessage[i].owner.id;
        if (userMessage === Number(userId)) {
          allUserMessages.push(everyMessage[i]);
        }
      }

      if (allUserMessages.length > 0) {
        const val = allUserMessages[allUserMessages.length - 1].id;
        setSentMessage(val);
      }
    }
  }, [everyMessage]);

  useEffect(() => {
    if (sentMessage) {
      postMessageToChat(sentMessage, id).then(setChatPage);
    }
  }, [sentMessage]);

  const goBack = (event) => {
    event.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    if (messageBox) {
      fetchAllMessages().then(setEveryMessage);
    }
  }, [messageBox]);

  const handleType = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMessage(data).then(setMessageBox);
  };

  const formInputProps = { data, handleType };
  return (
    <div className="background">
      <button onClick={goBack} className="back-button">
        Go Back To Chats
      </button>
      {messages ? (
        <>
          {messages.map((mess) => (
            <Messages {...mess} key={mess.id} />
          ))}
        </>
      ) : (
        <></>
      )}
      <form
        onSubmit={handleSubmit}
        onChange={handleType}
        className="message-form"
      >
        <FormInput
          placeholder="Type message"
          type="text"
          name="message_text"
          {...formInputProps}
        />
      </form>
    </div>
  );
};

export default ChatPage;
