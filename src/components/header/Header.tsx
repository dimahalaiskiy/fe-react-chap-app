import { useContext } from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import api from "../../services/api/core";

import { AuthContext } from "../../context/AuthProvider";

import {
  HeaderWrapper,
  HeaderLinkWrapper,
  HeaderLinkContent,
  LogoutButton,
} from "./header.styled";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as HomeIcon } from "../../assets/home.svg";

import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";

export const Header = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext) as AuthContext;

  const isProfilePage = useMatch("/profile");

  const onLogout = async () => {
    try {
      await api.post("auth/logout");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <HeaderWrapper>
      <HeaderLinkWrapper>
        {isProfilePage ? (
          <Link to="/">
            <HomeIcon fill="white" />
            <HeaderLinkContent style={{ marginLeft: "10px" }}>
              Home
            </HeaderLinkContent>
          </Link>
        ) : (
          <Link to="/profile">
            <ProfileIcon fill="white" />
            <HeaderLinkContent style={{ marginLeft: "10px" }}>
              My Profile
            </HeaderLinkContent>
          </Link>
        )}
      </HeaderLinkWrapper>
      <HeaderLinkWrapper style={{ justifyContent: "flex-end" }}>
        <LogoutButton onClick={onLogout}>
          Logout
          <LogoutIcon fill="white" style={{ marginLeft: "10px" }} />
        </LogoutButton>
      </HeaderLinkWrapper>
    </HeaderWrapper>
  );
};
