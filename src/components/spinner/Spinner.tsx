import React from 'react';
import { SpinnerContainer, SpinnerStyled } from './spinner.styles';

export interface SpinnerProps {
  margin?: string | undefined;
}

const Spinner: React.FC<SpinnerProps> = ({ margin }) => {
  return (
    <SpinnerContainer margin={margin}>
      <SpinnerStyled />
    </SpinnerContainer>
  );
};

export default Spinner;
