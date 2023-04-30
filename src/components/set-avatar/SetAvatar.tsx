import { ChangeEvent, useRef, useState } from "react";
import {
  SetAvatarWrapper,
  SetAvatarHeading,
  HiddenInput,
  ImageWrapper,
  Image,
} from "./setAvatar.styled";
import { Button } from "../button/Button";

export const SetAvatar = () => {
  const [image, setImage] = useState<string>("");
  const hiddenInput = useRef<HTMLInputElement>(null);

  const handleClickOnInput = () => {
    hiddenInput.current?.click();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const img = URL.createObjectURL(file);
      setImage(img);
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
