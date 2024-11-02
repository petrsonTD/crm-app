import { JSX } from "react";
import { UserDataI } from "../intefaces/interfaces.ts";
import ProfileRow from "./ProfileRow.tsx";

interface ProfileDataI {
  userData: UserDataI
}

function Profile({ userData }: ProfileDataI): JSX.Element {
  return (
    <>
      <h2 className="text-3xl justify-self-center">
        Profile
      </h2>

      <ProfileRow label="Username" inputKey="username" userData={userData} />
      <ProfileRow label="Email" inputKey="email" userData={userData} />
      <ProfileRow label="First Name" inputKey="firstName" userData={userData} />
      <ProfileRow label="Last Name" inputKey="lastName" userData={userData} />
      <ProfileRow label="Street name" inputKey="street" userData={userData} />
      <ProfileRow label="PSC" inputKey="psc" userData={userData} />
      <ProfileRow label="City" inputKey="city" userData={userData} />
    </>
  );
}

export default Profile;
