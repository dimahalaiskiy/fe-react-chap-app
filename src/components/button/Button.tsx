import React, { ReactNode } from 'react';

import { ButtonStyled } from './button.styled';

interface ButtonProps {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  onClick?: any;
  children?: ReactNode;
  margin?: string;
  padding?: string;
  width?: string;
}

export const Button: React.FC<ButtonProps> = ({ disabled, text, type, onClick, children, margin, padding, width }) => {
  return (
    <ButtonStyled type={type} margin={margin} disabled={disabled} width={width} onClick={onClick}>
      <span>{text}</span>
      {children}
    </ButtonStyled>
  );
};
