import { createContext, useEffect, useState } from "react";
import Data from "./Data";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [data] = useState(new Data());
  const [credentials, setCredentials] = useState(null);
  const [authorizedUser, setAuthorizedUser] = useState(
    localStorage.getItem("authUser") || null
  );

  const signIn = async (credentials) => {
    const user = await data.getUser("/users", credentials);
    if (user !== null) {
      const { username, password } = credentials;
      localStorage.setItem("authUser", user.firstName);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setAuthorizedUser(localStorage.authUser);
      setCredentials({
        username: localStorage.username,
        password: localStorage.password,
      });
    }
    return user;
  };

  const signOut = () => {
    setAuthorizedUser(null);
    setCredentials(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (localStorage.username && localStorage.password) {
      const { username, password } = localStorage;
      setCredentials({ username, password });
    }
  }, []);

  const providerValue = {
    data,
    credentials,
    authorizedUser,
    actions: { signIn, signOut },
  };

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
