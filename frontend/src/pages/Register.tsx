// eslint-disable-next-line import/namespace
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState, MouseEvent, useContext, JSX } from "react";
import { RegistrationErrorsI } from "../intefaces/interfaces.ts";
import { signupUser } from "../utils/utils.ts";
import { UserContext } from "../UserContextProvider.tsx";
import FormInput from "../components/FormInput.tsx";
import FormPassword from "../components/FormPassword.tsx";
import Button from "../components/Button.tsx";

function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const { addUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegistrationErrorsI>({});

  async function handleRegister(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const formDataObj = Object.fromEntries(data.entries());

    const userData = await signupUser(formDataObj, setErrors);
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
    setErrors((prevErrors: RegistrationErrorsI) => ({
      ...prevErrors,
      [elementId]: null
    }));
  };

  return (
    <div className="flex justify-center min-h-100 w-screen mt-12 mb-12">
      <div>
        <h2 className="text-3xl justify-self-center">
          Register
        </h2>

        <form
          method="post"
          onSubmit={handleRegister}
          className=""
        >
          <div className="flex gap-4">
            <FormInput
              label="Username"
              inputKey="username"
              errors={errors}
              removeError={removeError}
            />
            <FormInput
              label="Email"
              inputKey="email"
              errors={errors}
              removeError={removeError}
            />
          </div>
          <div className="flex gap-4">
            <FormPassword<RegistrationErrorsI>
              label="Password"
              inputKey="password"
              errors={errors}
              removeError={removeError}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
            <FormPassword<RegistrationErrorsI>
              label="Repeat password"
              inputKey="confirmPassword"
              errors={errors}
              removeError={removeError}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
          <div className="flex gap-4">
            <FormInput
              label="First Name"
              inputKey="firstName"
              errors={errors}
              removeError={removeError}
            />
            <FormInput
              label="Last Name"
              inputKey="lastName"
              errors={errors}
              removeError={removeError}
            />
          </div>
          <div className="flex gap-4">
            <FormInput
              label="Street name"
              inputKey="street"
              errors={errors}
              removeError={removeError}
            />
            <FormInput
              label="PSC"
              inputKey="psc"
              errors={errors}
              removeError={removeError}
            />
          </div>
          <div className="flex gap-4">
            <FormInput
              label="City"
              inputKey="city"
              errors={errors}
              removeError={removeError}
            />
          </div>

          <div className="text-base font-semibold text-red-500 mt-2">
            {Object.entries(errors).map(([key, error]) => (
              error && <span key={key} className="block">{error}</span>
            ))}
          </div>

          <div className="items-center justify-between mt-7 gap-4">
            <Button
              type="submit"
              primary
              mt="0"
            >
              Submit
            </Button>
            <Link
              to={"/login"}
              className="w-60 mt-4 mx-auto flex justify-center py-2 px-4 border-2 border-slate-400 shadow-sm text-sm font-medium bg-amber-50 hover:bg-amber-100 focus:bg-amber-200 transition duration-300 ease-in-out"
            >
              switch to Login
            </Link>
          </div>
        </form >
      </div>
    </div>
  );
}

export default RegisterPage;
