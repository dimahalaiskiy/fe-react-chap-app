import { ChangeEvent, useContext, useState } from "react";

import { AuthContext } from "../../context/AuthProvider";
import api from "../../services/api/core";

import { SetAvatar } from "../../components/set-avatar/SetAvatar";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";

import {
  ProfileSettingsWrapper,
  ChangeNicknameWrapper,
} from "./profileSettings.styled";

export const ProfileSettings = () => {
  const { userProfile } = useContext(AuthContext) as AuthContext;

  const [userName, setUserName] = useState(userProfile?.nickname || "");
  const [selectedFile, setSelectedFile] = useState<string | Blob>("");

  const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const setProfileData = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        const response = await api.post("/user/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Avatar uploaded successfully!", response.data);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  return (
    <ProfileSettingsWrapper>
      <SetAvatar avatar={userProfile.avatar} setFile={setSelectedFile} />
      <ChangeNicknameWrapper>
        <Input label="nickname" value={userName} setValue={changeUserName} />
        <Button
          width="116px"
          height="42px"
          text="Save"
          onClick={setProfileData}
        />
      </ChangeNicknameWrapper>
    </ProfileSettingsWrapper>
  );
};
