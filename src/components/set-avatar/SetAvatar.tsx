import { ChangeEvent, useRef, useState } from "react";
import {
  SetAvatarWrapper,
  SetAvatarHeading,
  HiddenInput,
  ImageWrapper,
  Image,
} from "./setAvatar.styled";
import { Button } from "../button/Button";

interface SetAvatar {
  setFile: React.Dispatch<React.SetStateAction<string | Blob>>;
  avatar: string | null | undefined;
}

export const SetAvatar: React.FC<SetAvatar> = ({ setFile, avatar }) => {
  const [image, setImage] = useState(avatar || "");
  const hiddenInput = useRef<HTMLInputElement>(null);

  const handleClickOnInput = () => {
    hiddenInput.current?.click();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const img = URL.createObjectURL(file);
      console.log("file", file);
      setImage(img);
      setFile(file);
    } else {
      alert("Please select an image file.");
    }
  };

  return (
    <SetAvatarWrapper>
      <SetAvatarHeading>Avatar</SetAvatarHeading>
      <ImageWrapper bg={image && "transparent"}>
        {image && (
          <Image width="120px" height="120px" src={image} alt="avatar" />
        )}
      </ImageWrapper>
      <HiddenInput ref={hiddenInput} type="file" onChange={handleFileUpload} />
      <Button height="42px" onClick={handleClickOnInput}>
        Change
      </Button>
    </SetAvatarWrapper>
  );
};
