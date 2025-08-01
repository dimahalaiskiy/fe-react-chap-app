import styled from "styled-components";

interface InputProps {
  error?: boolean;
  padding?: string;
  height?: string;
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p<InputProps>`
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: ${({ error }) => (error ? "#EB5757" : "#ffffff")};
`;

export const ErrorTip = styled.span`
  display: inline-block;
  margin-left: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #eb5757;
`;

export const InputStyled = styled.input<InputProps>`
  min-width: 260px;
  padding: ${({ padding }) => (padding ? padding : "0px 20px")};
  max-height: 60px;
  height: ${({ height }) => (height ? height : "62px")};
  background-color: transparent;
  border: ${({ error }) =>
    error ? "1px solid rgba(235, 87, 87, 0.16);" : "1px solid rgba(255, 255, 255, 0.08)"};
  border-radius: 8px;
  outline: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  :focus {
    border: ${({ error }) =>
      error ? "1px solid rgba(235, 87, 87, 0.16);" : "1px solid rgba(255, 255, 255, 0.16)"};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: transparent;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
