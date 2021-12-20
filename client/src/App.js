import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getToken } from "./helpers/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      <body>
        <headers></headers>
        <main>
          <Routes>
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route
              path="/login"
              element={
                <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </body>
    </Router>
  );
}

export default App;
