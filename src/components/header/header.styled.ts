import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 64px;
  margin-bottom: 40px;
  padding: 12px 0px;
  display: flex;
  justify-content: space-beetwen;
  background-color: transparent;
  align-items: center;
`;

export const HeaderLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  > a {
    > svg {
      transition: 0.1s linear;
    }
    > span {
      transition: 0.1s linear;
    }
    :hover {
      > svg {
        fill: rgba(255, 255, 255, 0.6);
      }
      > span {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

export const HeaderLinkContent = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
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
