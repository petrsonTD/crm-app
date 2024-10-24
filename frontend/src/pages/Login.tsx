// eslint-disable-next-line import/namespace
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState, MouseEvent, useContext, JSX } from "react";
import { ErrorsI } from "../intefaces/interfaces.ts";
import { loginUser } from "../utils/utils.ts";
import { UserContext } from "../UserContextProvider.tsx";
import FormInput from "../components/FormInput.tsx";
import FormPassword from "../components/FormPassword.tsx";

function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { addUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsI>({
    username: "",
    password: "",
    confirmPassword: ""
  });

  async function handleLogin(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const formDataObj = Object.fromEntries(data.entries());

    const userData = await loginUser(formDataObj, setErrors);
    if (userData.username) {
      addUser(userData);
      navigate("/");
    }
  };


  function togglePasswordVisibility(): void {
    setShowPassword(prev => !prev);
  };

  function removeError(e: MouseEvent<HTMLInputElement>): void {
    const elementId = e.currentTarget.id;
    setErrors((prevErrors: ErrorsI) => ({
      ...prevErrors,
      [elementId]: null
    }));
  };

  return (
    <form
      method="post"
      onSubmit={handleLogin}
      className="flex justify-center min-h-100 w-screen mt-12 mb-12"
    >
      <div className="">
        <h2 className="text-3xl">
          Login
        </h2>

        <FormInput
          label="Username"
          inputKey="username"
          errors={errors}
          removeError={removeError}
        />
        <FormPassword
          label="Password"
          inputKey="password"
          errors={errors}
          removeError={removeError}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        <div className="text-base font-semibold text-red-500 mt-2">
          <span className="block">{errors?.username}</span>
        </div>

        <div className="flex items-center justify-between mt-7">
          <button className="inline-flex justify-center py-2 px-4 border-2 border-slate-400 shadow-sm text-sm font-medium bg-amber-100 hover:bg-amber-200 focus:bg-amber-300 transition duration-300 ease-in-out">
            Submit
          </button>
          <Link to={"/register"} className="inline-flex justify-center py-2 px-4 border-2 border-slate-400 shadow-sm text-sm font-medium bg-amber-50 hover:bg-amber-100 focus:bg-amber-200 transition duration-300 ease-in-out">
            switch to Register
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;