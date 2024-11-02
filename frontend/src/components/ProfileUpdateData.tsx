import { MouseEvent, JSX, FormEventHandler } from "react";
import { RegistrationErrorsI, UserDataI } from "../intefaces/interfaces.ts";
import FormInput from "./FormInput.tsx";
import FormPassword from "./FormPassword.tsx";
import Button from "./Button.tsx";

interface ProfileUpdateDataI {
  userData: UserDataI;
  handleUpdateUserData: FormEventHandler<HTMLFormElement>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  errors: RegistrationErrorsI;
  removeError: (e: MouseEvent<HTMLInputElement>) => void;
}

function ProfileUpdateData(
  { userData, handleUpdateUserData, showPassword, togglePasswordVisibility, errors, removeError }: ProfileUpdateDataI
): JSX.Element {
  return (
    <>
      <h2 className="text-3xl justify-self-center">
        Edit Profile
      </h2>

      <form
        method="post"
        onSubmit={handleUpdateUserData}
      >
        <input
          name="id"
          value={userData.id}
          hidden
        />
        <div className="flex gap-4">
          <FormInput
            label="Username"
            inputKey="username"
            defaultValue={userData.username}
            disabled
            errors={errors}
            removeError={removeError}
          />
          <FormInput
            label="Email"
            inputKey="email"
            defaultValue={userData.email}
            errors={errors}
            removeError={removeError}
          />
        </div>
        <div className="flex gap-4">
          <FormInput
            label="First Name"
            inputKey="firstName"
            defaultValue={userData.firstName}
            errors={errors}
            removeError={removeError}
          />
          <FormInput
            label="Last Name"
            inputKey="lastName"
            defaultValue={userData.lastName}
            errors={errors}
            removeError={removeError}
          />
        </div>
        <div className="flex gap-4">
          <FormInput
            label="Street name"
            inputKey="street"
            defaultValue={userData.street}
            errors={errors}
            removeError={removeError}
          />
          <FormInput
            label="PSC"
            inputKey="psc"
            defaultValue={userData.psc}
            errors={errors}
            removeError={removeError}
          />
        </div>
        <FormInput
          label="City"
          inputKey="city"
          defaultValue={userData.city}
          errors={errors}
          removeError={removeError}
        />
        <FormPassword<RegistrationErrorsI>
          label="Pasword"
          hint="Write password for confirmation."
          inputKey="password"
          errors={errors}
          removeError={removeError}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        <div className="text-base font-semibold text-red-500 mt-2">
          {Object.entries(errors).map(([key, error]) => (
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

export default ProfileUpdateData;
