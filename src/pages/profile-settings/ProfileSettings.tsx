import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";

import { SetAvatar } from "@/components/set-avatar/SetAvatar";
import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { ProfileSettingsWrapper, ChangeNicknameWrapper } from "./profileSettings.styled";

import { useAuth } from "@/hooks/useAuth";
import { CoreApiProvider } from "@/services/api";
import Spinner from "@/components/spinner/Spinner";

export const ProfileSettings = () => {
  const {
    user: { username, avatar, id },
    setUserProfile,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState<string>(username || "");
  const [selectedFile, setSelectedFile] = useState<File>(new File([], ""));

  const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  const setAvatar = (file: File) => {
    setSelectedFile(file);
  };

  const changeNickname = async () => {
    try {
      await CoreApiProvider.changeNickname(nickname, id);
      setUserProfile((prev) => ({
        ...prev,
        username: nickname,
      }));
      toast.success("Nickname changed successfully");
    } catch (error) {
      console.error("Error changing nickname:", error);
    }
  };

  const setProfileData = async () => {
    setIsLoading(true);

    try {
      if (selectedFile.name) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        try {
          const { data } = await CoreApiProvider.uploadAvatar(formData);
          setUserProfile((prev) => ({
            ...prev,
            avatar: data.avatar,
          }));
          setSelectedFile(new File([], ""));
          toast.success("Avatar uploaded successfully");
        } catch (error) {
          console.error("Error uploading avatar:", error);
        }
      }

      if (nickname !== username) {
        await changeNickname();
      }
    } catch (error) {
      toast.error("Error setting profile data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileSettingsWrapper>
      <SetAvatar avatar={avatar} setAvatar={setAvatar} selectedFile={selectedFile} />
      <ChangeNicknameWrapper>
        <Input label="nickname" value={nickname} setValue={changeUserName} />
        <Button
          width="116px"
          height="42px"
          text="Save"
          disabled={nickname === username && (!selectedFile || selectedFile.name === "")}
          onClick={setProfileData}
        >
          {isLoading && <Spinner margin="0px 0px 0px 20px" />}
        </Button>
      </ChangeNicknameWrapper>
    </ProfileSettingsWrapper>
  );
};
