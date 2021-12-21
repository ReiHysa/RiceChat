import { getId } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { deleteAChat } from "../helpers/api";

const UserChats = (chat) => {
  const navigate = useNavigate();

  const ser = chat.users.filter((r) => !getId().includes(r.id));

  const handleClick = (event) => {
    navigate(`/chat/${event.target.classList[0]}`);
  };

  const deleteChat = (event) => {
    const chatId = Number(event.target.classList[0]);

    const confirmation = confirm("You sure you want to delete this chat?");

    if (confirmation) deleteAChat(chatId);
  };

  return (
    <div className="containers-container">
      <div className={`${chat.id} container`} onClick={handleClick}>
        <div className={`${chat.id} group-one`}>
          <div className={`${chat.id} circle`}></div>

          <h1 className={chat.id} onClick={handleClick} id="chat-list-names">
            {ser[0].username}
          </h1>
        </div>
      </div>
      <div className={`${chat.id} delete-chat`} onClick={deleteChat}>
        <p className={chat.id}>X</p>
      </div>
    </div>
  );
};

export default UserChats;
