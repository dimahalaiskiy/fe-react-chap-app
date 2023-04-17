import React, { ReactNode } from 'react';

import { ButtonStyled } from './Button.styles';

interface ButtonI {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  onClick?: any;
  children?: ReactNode;
  margin?: string;
}

export const Button: React.FC<ButtonI> = ({
  disabled,
  text,
  type,
  onClick,
  children,
  margin,
}) => {
  return (
    <ButtonStyled
      type={type}
      margin={margin}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{text}</span>
      {children}
    </ButtonStyled>
  );
};
