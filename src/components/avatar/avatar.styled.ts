import styled from "styled-components";

export const ImageAvatar = styled.img<{ size?: number }>`
  border-radius: 100%;
  width: ${({ size }) => (size ? `${size}px` : "32px")};
  height: ${({ size }) => (size ? `${size}px` : "32px")};
  object-fit: cover;
`;
