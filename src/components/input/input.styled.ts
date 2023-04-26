import styled from 'styled-components';

interface ErrorProps {
  error: boolean | undefined;
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p<ErrorProps>`
  margin-bottom: 18px;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: ${({ error }) => (error ? '#EB5757' : '#ffffff')};
`;

export const ErrorTip = styled.span`
  display: inline-block;
  margin-left: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #eb5757;
`;

export const InputStyled = styled.input<ErrorProps>`
  min-width: 260px;
  padding: 0px 20px;
  max-height: 60px;
  height: 62px;
  background-color: transparent;
  border: ${({ error }) => (error ? '1px solid rgba(235, 87, 87, 0.16);' : '1px solid rgba(255, 255, 255, 0.08)')};
  border-radius: 8px;
  outline: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  :focus {
    border: ${({ error }) => (error ? '1px solid rgba(235, 87, 87, 0.16);' : '1px solid rgba(255, 255, 255, 0.16)')};
  }
`;
