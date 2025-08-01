import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  height: inherit;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
  padding: 24px 0px;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  align-items: center;
`;

export const Heading = styled.h2`
  font-weight: 500;
  font-size: 24px;
  color: white;
`;

export const LogoButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  display: flex;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  transition: 0.1s linear;
  > svg {
    transition: 0.1s linear;
  }
  :hover {
    color: rgba(255, 255, 255, 0.6);
    > svg {
      fill: rgba(255, 255, 255, 0.6);
    }
  }
`;

export const ProfileButton = styled.button`
  cursor: pointer;
`;
