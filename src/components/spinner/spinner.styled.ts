import styled from "styled-components";
import { SpinnerProps } from "./Spinner";

export const SpinnerContainer = styled.div<SpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin || "0px"};
`;

export const SpinnerStyled = styled.span`
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
