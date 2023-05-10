import { ChangeEvent, useContext, useState } from "react";

import { SetAvatar } from "../../components/set-avatar/SetAvatar";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";

import {
  ProfileSettingsWrapper,
  ChangeNicknameWrapper,
} from "./profileSettings.styled";
import { AuthContext } from "../../context/AuthProvider";

export const ProfileSettings = () => {
  const { userProfile } = useContext(AuthContext) as AuthContext;

  const [userName, setUserName] = useState(userProfile?.nickname || "");

  const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  return (
    <ProfileSettingsWrapper>
      <SetAvatar />
      <ChangeNicknameWrapper>
        <Input label="nickname" value={userName} setValue={changeUserName} />
        <Button width="116px" height="42px" text="Save" />
      </ChangeNicknameWrapper>
    </ProfileSettingsWrapper>
  );
};
