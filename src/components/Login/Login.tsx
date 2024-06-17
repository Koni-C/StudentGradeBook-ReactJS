import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";

interface LoginProps {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ token, setToken }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function usernameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function passwordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

function login() {
  const data = new FormData();
  data.append("username", username || "default_username");
  data.append("password", password || "default_password");

  const config = {
    method: "post",
    url: "http://127.0.0.1:8000/auth/",
    headers: {},
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.token));
      localStorage.setItem("token", response.data.token);
      setToken(localStorage.getItem("token"));
    })
    .catch(function (error) {
      console.log(error);
    });
}


  function logout() {
    localStorage.removeItem("token");
  }

  return (
    <div>
      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
          <div>
            <p>
              Login
              </p>
                <p>
                  Username:{" "}
                  <input
                      onChange={usernameHandler}
                      type={"text"}
                      placeholder={"username"}
                  />
                </p>
                <p>
                  Password: <input onChange={passwordHandler} type={"password"}/>
                </p>
                <button onClick={login}>Login</button>
          </div>
        )}
    </div>
  );
};

export default Login;
