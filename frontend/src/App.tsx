import { FormEvent, useEffect, useState } from "react";
import Login from "./components/Login.tsx";
import { ErrorsI, UserI } from "./intefaces/interfaces.ts";
import { getCookies, loginUser, signupUser } from "./utils/utils.ts";

function App() {
  const [user, setUser] = useState<UserI>({ username: "" });
  const [errors, setErrors] = useState<ErrorsI>({
    username: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    getCookies(setUser);
  }, []);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const formDataObj = Object.fromEntries(data.entries());

    const userData = await loginUser(formDataObj, setErrors);
    setUser(userData);
  };

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const formDataObj = Object.fromEntries(data.entries());

    const userData = await signupUser(formDataObj, setErrors);
    setUser(userData);
  };

  return (
    <>
      {!user.username && (
        <Login
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {user.username && (
        <h2>
          {user.username}
        </h2>
      )}
    </>
  );
}

export default App;
