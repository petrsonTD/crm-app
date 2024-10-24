// eslint-disable-next-line import/namespace
import { useNavigate } from "react-router-dom";
import { createContext, ReactNode, useEffect, useState, JSX } from "react";
import { UserI } from "./intefaces/interfaces.ts";
import { getCookies } from "./utils/utils.ts";

interface UserContextType {
  user: UserI;
  addUser: (newUser: UserI) => void;
  removeUser: () => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: { username: "", firstName: "", lastName: "" },
  addUser: () => { },
  removeUser: () => { }
});

export default function UserContextProvider({ children }: UserContextProviderProps): JSX.Element {
  const [user, setUser] = useState<UserI>({ username: "", firstName: "", lastName: "" });
  const navigate = useNavigate();

  function addUser(newUser: UserI): void {
    setUser(newUser);
  }

  function removeUser(): void {
    setUser({ username: "", firstName: "", lastName: "" });
    navigate("/login");
  }

  const ctxValue = {
    user: user,
    addUser: addUser,
    removeUser: removeUser
  };

  useEffect(() => {
    getCookies(setUser);
  }, []);

  return (
    <UserContext.Provider value={ctxValue} >
      {children}
    </UserContext.Provider>
  );
}
