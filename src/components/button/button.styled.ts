import styled from 'styled-components';

interface ButtonProps {
  margin?: string;
  width?: string;
}

export const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  text-align: center;
  cursor: pointer;
  height: 50px;
  background: ${({ disabled }) => (disabled ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)')};
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: background 0.2s ease-out;
  margin: ${({ margin }) => margin || '0px'};
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
