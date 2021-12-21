import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreateChat from "../components/CreateChat";
import Header from "../components/Header";
import UserChats from "../components/UserChats";
import { fetchAllChats, fetchUserChats } from "../helpers/api";
import { getId, getToken } from "../helpers/auth";
import "../styles/Home.css";

const Home = () => {
  const [allChats, setAllChats] = useState(null);
  const [allChatsTwo, setAllChatsTwo] = useState(null);
  const [userChats, setUserChats] = useState(null);
  const [chats, setChats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (allChats !== null && allChatsTwo !== null) {
      setInterval(() => {
        fetchAllChats().then(setAllChatsTwo);

        if (allChats.length !== allChatsTwo.length) {
          window.location.reload();
        }
      }, 2000);
    }
  }, [allChatsTwo]);

  const fetchCommand = () => {
    fetchAllChats().then(setAllChats);
    return;
  };

  useEffect(() => {
    const logCheck = () => {
      const token = getToken();
      if (token === null) {
        navigate("/login");
      }
      fetchAllChats().then(setAllChats);
      fetchAllChats().then(setAllChatsTwo);
      if (!allChats) {
        fetchCommand();
      }
    };
    logCheck();
  }, []);

  useEffect(() => {
    if (allChats) {
      const userId = getId();
      fetchUserChats(Number(userId)).then(setUserChats);
    }
  }, [allChats]);

  useEffect(() => {
    if (userChats) {
      const res = allChats.filter((f) => userChats.includes(f.id));
      setChats(res);
    }
  }, [userChats]);

  return (
    <>
      <header>
        <section className="logo">
          <h1>RiceChat 🍚</h1>
        </section>
        <Header />
      </header>
      <div className="search-div">
        <CreateChat />
      </div>
      <div className="complete-container">
        {chats ? (
          <section className="chat-selector">
            {chats.map((chat) => (
              <>
                <UserChats {...chat} key={chats.id} />
              </>
            ))}
          </section>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Home;
