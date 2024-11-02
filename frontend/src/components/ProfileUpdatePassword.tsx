import { MouseEvent, JSX, FormEventHandler } from "react";
import { PasswordI, UserDataI } from "../intefaces/interfaces.ts";
import FormPassword from "./FormPassword.tsx";
import Button from "./Button.tsx";

interface ProfileUpdatePasswordI {
  userData: UserDataI;
  handleUpdateUserPassword: FormEventHandler<HTMLFormElement>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  paswordErrors: PasswordI;
  removePasswordError: (e: MouseEvent<HTMLInputElement>) => void;
}

function ProfileUpdatePassword(
  { userData, handleUpdateUserPassword, showPassword, togglePasswordVisibility, paswordErrors, removePasswordError }: ProfileUpdatePasswordI
): JSX.Element {
  return (
    <>
      <h2 className="text-3xl justify-self-center">
        Change Password
      </h2>
      <form
        method="post"
        onSubmit={handleUpdateUserPassword}
      >
        <input
          name="id"
          value={userData.id}
          hidden
        />
        <FormPassword<PasswordI>
          label="Old pasword"
          inputKey="oldPassword"
          errors={paswordErrors}
          removeError={removePasswordError}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <FormPassword<PasswordI>
          label="New password"
          inputKey="newPassword"
          errors={paswordErrors}
          removeError={removePasswordError}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <FormPassword<PasswordI>
          label="Repeat new password"
          inputKey="confirmNewPassword"
          errors={paswordErrors}
          removeError={removePasswordError}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        <div className="text-base font-semibold text-red-500 mt-2">
          {Object.entries(paswordErrors).map(([key, error]) => (
            error && <span key={key} className="block">{error}</span>
          ))}
        </div>

        <Button
          type="submit"
          primary
          mt="2rem"
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default ProfileUpdatePassword;
