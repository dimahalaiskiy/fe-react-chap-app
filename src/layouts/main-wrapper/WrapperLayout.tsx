import React, { useContext } from "react";
import { LayoutWrapper } from "./WrapperLayout.styled";
import { Header } from "../../components/header/Header";
import { AuthContext } from "../../context/AuthProvider";

interface Layout {
  children: JSX.Element;
}

export const Layout: React.FC<Layout> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContext;
  return (
    <LayoutWrapper>
      {isAuthenticated && <Header />}
      {children}
    </LayoutWrapper>
  );
};

