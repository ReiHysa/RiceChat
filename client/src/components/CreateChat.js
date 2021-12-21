import React, { useEffect, useState } from "react";
import { fetchAllChats, fetchAllUsers, updateChats } from "../helpers/api";
import { createChat } from "../helpers/api";
import { getId } from "../helpers/auth";

const CreateChat = () => {
  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allChats, setAllChats] = useState(null);
  const [allChatsTwo, setAllChatsTwo] = useState(null);
  const [userChats, setUserChats] = useState(null);
  const [otherChats, setOtherChats] = useState(null);

  useEffect(() => {
    if (allChats) {
      fetchAllChats().then(setAllChatsTwo);
    }
  }, [allChats]);
  useEffect(() => {
    if (allChatsTwo) {
      if (allChatsTwo.length > 0) {
        const finalValue = allChatsTwo[allChatsTwo.length - 1];
        fetchAllChats().then(setAllChatsTwo);

        updateChats(Number(getId()), Number(finalValue.id)).then(setUserChats);
        updateChats(finalValue.users[0].id, Number(finalValue.id)).then(
          setOtherChats
        );
        setInterval(() => {
          window.location.reload();
        }, 100);
      }
    }
  }, [allChatsTwo]);

  useEffect(() => {
    if (otherChats && userChats) {
    }
  }, [otherChats]);

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    fetchAllUsers().then((response) => {
      const filteredUsers = response.filter((data) => {
        return data.username.toLowerCase().includes(searchWord.toLowerCase());
      });
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(filteredUsers);
      }
    });
  };

  const handleClick = (event) => {
    const otherId = Number(event.target.id);
    createChat(otherId);
    fetchAllChats().then(setAllChats);
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="search-container">
      <div className="search">
        <div className="searchInput">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Create new chat?"
              value={wordEntered}
              onChange={handleFilter}
              className="searching-bar"
            />
          </form>
        </div>
      </div>
      <div className="search-results">
        {filteredData.length !== 0 && (
          <div className="data-results">
            {filteredData.map((data) => {
              return (
                <li
                  className="data-item"
                  onClick={handleClick}
                  value={data}
                  key={data.id}
                  id={data.id}
                >
                  {data.username}
                </li>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateChat;
