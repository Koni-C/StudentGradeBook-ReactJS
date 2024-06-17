import React, { useEffect } from "react";

import "./App.css";

import Menu from "./components/Menu";
import Login from "./components/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [token, setToken] = React.useState<string | null>("");

  return <>{token ? <Menu /> : <Login token={token} setToken={setToken} />}</>;
}
export default App;
