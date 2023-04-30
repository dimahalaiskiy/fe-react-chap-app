import React from 'react';
import { SetAvatarWrapper, SetAvatarHeading, ImageWrapper } from './setAvatar.styled';

export const SetAvatar = () => {
  return (
    <SetAvatarWrapper>
      <SetAvatarHeading>
        Avatar
        <ImageWrapper></ImageWrapper>
      </SetAvatarHeading>
    </SetAvatarWrapper>
  );
};
