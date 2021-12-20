import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken, getToken, setId } from "../helpers/auth";
import FormInput from "../components/FormInput";
import { login } from "../helpers/api";

const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logCheck = () => {
      const token = getToken();
      console.log(token);
      if (token !== null) {
        navigate("/home");
        console.log("heyo");
      }
    };
    logCheck();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    login(data).then(handleSuccessfulLogin).catch(handleError);
  };

  const handleSuccessfulLogin = (data) => {
    setToken(`Bearer ${data.token}`);
    setId(data.id);
    console.log(getToken());
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleError = (error) => {
    if (error.response) {
      console.log(error);
      setIsError(true);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const formInputProps = { data, handleFormChange };

  return (
    <div className="holder">
      <section className="login">
        <form onSubmit={handleSubmit} className="login-form" method="post">
          <h1 className="title">RiceChat</h1>
          <FormInput
            placeholder="Username"
            type="text"
            name="username"
            {...formInputProps}
          />
          <FormInput
            placeholder="Email"
            type="email"
            name="email"
            {...formInputProps}
          />
          <FormInput
            placeholder="password"
            type="password"
            name="password"
            {...formInputProps}
          />
          <div className="sub-hold">
            <input type="submit" value="Login" className="submit-button" />
          </div>
          <div className="container">
            <Link
              to="/register"
              className="login-link a"
              style={{ textDecoration: "none" }}
            >
              No account? Click here to register!
            </Link>
          </div>
          {isError ? (
            <div className="error">
              <p>Error. Please try again.</p>
            </div>
          ) : (
            <></>
          )}
        </form>
      </section>
    </div>
  );
};

export default Login;
