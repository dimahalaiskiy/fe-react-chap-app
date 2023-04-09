import React from 'react';
import styled from 'styled-components';

interface SpinnerI {
  margin?: string | undefined;
}

const Spinner: React.FC<SpinnerI> = ({ margin }) => {
  return (
    <SpinnerContainer margin={margin}>
      <SpinnerStyled />
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.div<SpinnerI>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin || '0px'};
`;

const SpinnerStyled = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #fff;
  border-top-color: #555;
  animation: spinner 0.6s linear infinite;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;
