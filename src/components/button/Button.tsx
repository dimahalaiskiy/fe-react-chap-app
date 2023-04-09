import React, { ReactNode } from 'react';

import { ButtonStyled } from './Button.styles';

interface ButtonI {
  disabled?: boolean;
  text?: string;
  onClick?: any;
  children?: ReactNode;
}

export const Button: React.FC<ButtonI> = ({
  disabled,
  text,
  onClick,
  children,
}) => {
  return (
    <ButtonStyled disabled={disabled} onClick={onClick}>
      <span>{text}</span>
      {children}
    </ButtonStyled>
  );
};
