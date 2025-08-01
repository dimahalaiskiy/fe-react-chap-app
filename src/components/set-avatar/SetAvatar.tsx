import { ChangeEvent, useRef, useState } from "react";
import {
  SetAvatarWrapper,
  SetAvatarHeading,
  HiddenInput,
  Image,
  CloseButton,
} from "./setAvatar.styled";
import { Button } from "@/components/button/Button";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { Avatar } from "@/components/avatar/Avatar";
import { useAuth } from "@/hooks/useAuth";

interface SetAvatar {
  setAvatar: React.Dispatch<File>;
  avatar: string | null | undefined;
  selectedFile: File;
}

export const SetAvatar: React.FC<SetAvatar> = ({ setAvatar, avatar, selectedFile }) => {
  const { user } = useAuth();

  const [image, setImage] = useState(avatar || "");
  const [shouldShowClearButton, setShouldShowClearButton] = useState(false);

  const hiddenInput = useRef<HTMLInputElement>(null);

  const onInputClick = () => {
    hiddenInput.current?.click();
  };

  const onClearAvatar = () => {
    setImage(avatar || "");
    setAvatar(new File([], ""));
    if (hiddenInput.current) {
      hiddenInput.current.value = "";
    }
    setShouldShowClearButton(false);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const img = URL.createObjectURL(file);
      setImage(img);
      setAvatar(file);
      setShouldShowClearButton(true);
    } else {
      alert("Please select an image file.");
    }
  };

  return (
    <SetAvatarWrapper>
      <SetAvatarHeading>Avatar</SetAvatarHeading>
      {shouldShowClearButton && selectedFile.name && (
        <CloseButton onClick={onClearAvatar}>
          <CloseIcon width="18" height="18" />
        </CloseButton>
      )}
      {image ? (
        <Image width="120px" height="120px" src={image} alt="avatar" />
      ) : (
        <Avatar user={user} size={120} />
      )}
      <HiddenInput ref={hiddenInput} type="file" onChange={handleFileUpload} />
      <Button height="42px" onClick={onInputClick} margin="20px 0px 0px 0px">
        Change
      </Button>
    </SetAvatarWrapper>
  );
};
