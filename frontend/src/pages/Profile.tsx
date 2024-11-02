import { JSX, useContext, useEffect, useState, MouseEvent, FormEvent } from "react";
import { getUserData, updateUserData, updateUserPassword } from "../utils/utils.ts";
import { UserContext } from "../UserContextProvider.tsx";
import { PasswordI, RegistrationErrorsI, UserDataI } from "../intefaces/interfaces.ts";
import Profile from "../components/Profile.tsx";
import ProfileUpdateData from "../components/ProfileUpdateData.tsx";
import ProfileUpdatePassword from "../components/ProfileUpdatePassword.tsx";
import ProfileButtons from "../components/ProfileButtons.tsx";
import { DEFAULT_USER_DATA } from "../defaultValues/defaultValues.ts";

function ProfilePage(): JSX.Element {
  const { user, addUser } = useContext(UserContext);
  const [profileMode, setProfileMode] = useState("viewProfile");
  const [userData, setUserData] = useState<UserDataI>(DEFAULT_USER_DATA);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegistrationErrorsI>({});
  const [paswordErrors, setPasswordErrors] = useState<PasswordI>({});

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

  function removePasswordError(e: MouseEvent<HTMLInputElement>): void {
    const elementId = e.currentTarget.id;
    setPasswordErrors((prevErrors: PasswordI) => ({
      ...prevErrors,
      [elementId]: null
    }));
  };

  async function handleUpdateUserData(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const formDataObj = Object.fromEntries(data.entries());

    const userData = await updateUserData(formDataObj, setErrors);
    if (userData.username) {
      addUser(userData);
      setProfileMode("viewProfile");
    }
  };

  async function handleUpdateUserPassword(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const formDataObj = Object.fromEntries(data.entries());

    const response = await updateUserPassword(formDataObj, setPasswordErrors);
    if (response) {
      setProfileMode("viewProfile");
    }
  };

  useEffect(() => {
    getUserData(user.id, setUserData);
  }, [user]);

  return (
    <div className="flex justify-center min-h-100 w-screen mt-12 mb-12">
      <div>

        {(profileMode === "viewProfile") && (
          <Profile userData={userData} />
        )}

        {(profileMode === "updateProfile") && (
          <ProfileUpdateData
            userData={userData}
            handleUpdateUserData={handleUpdateUserData}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            errors={errors}
            removeError={removeError}
          />
        )}

        {(profileMode === "updatePassword") && (
          <ProfileUpdatePassword
            userData={userData}
            handleUpdateUserPassword={handleUpdateUserPassword}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            paswordErrors={paswordErrors}
            removePasswordError={removePasswordError}
          />
        )}

        <ProfileButtons
          profileMode={profileMode}
          setProfileMode={setProfileMode}
          setShowPassword={setShowPassword}
        />
      </div>
    </div >
  );
}

export default ProfilePage;
