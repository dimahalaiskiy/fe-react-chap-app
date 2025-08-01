import styled from "styled-components";

interface ButtonProps {
  margin?: string;
  width?: string;
  height?: string;
}

export const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "50px"};
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ disabled }) =>
    disabled ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  transition: background 0.2s ease-out;
  margin: ${({ margin }) => margin || "0px"};
  :hover {
    background: ${({ disabled }) =>
      disabled ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.1)"};
  }
`;
