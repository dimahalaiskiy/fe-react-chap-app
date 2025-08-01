import styled from "styled-components";

interface ImageWrapper {
  bg?: string;
}

export const SetAvatarWrapper = styled.div`
  position: relative;
  width: 120px;
`;

export const SetAvatarHeading = styled.h4`
  margin-bottom: 18px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #f3f3f3;
`;

export const ImageWrapper = styled.div<ImageWrapper>`
  margin-top: 5px;
  margin-bottom: 20px;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  background: ${({ bg }) =>
    bg ||
    `linear-gradient(
    94.21deg,
    #fcc914 -11.67%,
    #fe6f37 35.99%,
    #c66add 85.06%,
    #9a74f1 122.91%
  )`};
`;

export const Image = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const CloseButton = styled.button`
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  top: 24px;
  right: 8px;
  position: absolute;
  background: transparent;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
  transition: color 0.2s ease-out;
`;
