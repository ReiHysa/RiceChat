import React from "react";
import { useNavigate } from "react-router";
import { removeId, removeToken } from "../helpers/auth";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    removeId();
    console.log("REMOVED");
    navigate("/login");
  };
  return (
    <div>
      <ul>
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  );
};

export default Header;
