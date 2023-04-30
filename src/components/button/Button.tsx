import React, { ReactNode } from "react";

import { ButtonStyled } from "./button.styled";

interface ButtonProps {
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  onClick?: any;
  children?: ReactNode;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
}

export const Button: React.FC<ButtonProps> = ({
  disabled,
  text,
  type,
  onClick,
  children,
  margin,
  height,
  width,
}) => {
  return (
    <ButtonStyled
      type={type}
      margin={margin}
      disabled={disabled}
      width={width}
      height={height}
      onClick={onClick}
    >
      <span>{text}</span>
      {children}
    </ButtonStyled>
  );
};
