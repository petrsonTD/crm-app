import { JSX } from "react";
import { UserDataI } from "../intefaces/interfaces.ts";

interface ProfileRoWI {
  label: string;
  inputKey: keyof UserDataI;
  userData: UserDataI;
}

function ProfileRow({ label, inputKey, userData }: ProfileRoWI): JSX.Element {
  return (
    <div className="mt-4 flex items-center border-b-2 border-slate-200">
      <label className="w-28 text-base font-semibold">
        {`${label}: `}
      </label>
      <span className={"shadow-sm"}>
        {userData[inputKey]}
      </span>
    </div>
  );
}

export default ProfileRow;
