import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoreApiProvider } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import { showErrorToast } from "@/utils/toastUtils";

import {
  HeaderWrapper,
  Heading,
  LogoButton,
  ProfileContainer,
  ProfileButton,
} from "./header.styled";
import { Dropdown, DropdownWrapper } from "@/components/dropdown/Dropdown";
import { SocketStatus } from "@/components/socket-status";
import { Avatar } from "@/components/avatar/Avatar";

export const Header = () => {
  const { setIsAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [isWaitingForLogout, setIsWaitingForLogout] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onLogout = async () => {
    setIsWaitingForLogout(true);
    try {
      await CoreApiProvider.logout();
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      showErrorToast("Error logging out");
    } finally {
      setIsWaitingForLogout(false);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const dropdownItems = [
    {
      label: "Profile",
      onClick: handleProfileClick,
      hasBorder: true,
    },
    {
      label: isWaitingForLogout ? "Logging out..." : "Logout",
      onClick: onLogout,
      isDisabled: isWaitingForLogout,
    },
  ];

  return (
    <HeaderWrapper>
      <LogoButton onClick={() => navigate("/")}>
        <img src="logo.png" alt="logo" width="44" height="44" />
        <Heading>Chat App</Heading>
      </LogoButton>
      <ProfileContainer>
        <SocketStatus />
        <DropdownWrapper>
          <ProfileButton onClick={(e) => toggleDropdown(e)} id="profile-button">
            <Avatar user={user} size={40} />
          </ProfileButton>
          <Dropdown isOpen={isDropdownOpen} items={dropdownItems} onClose={closeDropdown} />
        </DropdownWrapper>
      </ProfileContainer>
    </HeaderWrapper>
  );
};
