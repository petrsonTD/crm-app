import { JSX, Dispatch, SetStateAction } from "react";
import Button from "./Button.tsx";

interface ProfileButtonsI {
  profileMode: string;
  setProfileMode: Dispatch<SetStateAction<string>>;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

function ProfileButtons({ profileMode, setProfileMode, setShowPassword }: ProfileButtonsI): JSX.Element {
  return (
    <div className="flex flex-col">
      {(profileMode === "viewProfile") && (
        <Button
          type="button"
          primary
          onClick={() => {
            setShowPassword(false);
            setProfileMode("updateProfile");
          }}
        >
          Edit profile
        </Button>
      )}
      {(profileMode === "viewProfile") && (
        <Button
          type="button"
          primary
          onClick={() => {
            setShowPassword(false);
            setProfileMode("updatePassword");
          }}
        >
          Change password
        </Button>
      )}
      {(profileMode !== "viewProfile") && (
        <Button
          type="button"
          primary={false}
          onClick={() => {
            setShowPassword(false);
            setProfileMode("viewProfile");
          }}
        >
          Back to profile
        </Button>
      )}
    </div>
  );
}

export default ProfileButtons;
