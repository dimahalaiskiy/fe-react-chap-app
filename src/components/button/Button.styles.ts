import styled from 'styled-components';

export const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;
  height: 50px;
  background: ${({ disabled }) =>
    disabled ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: background 0.2s ease-out;
  :hover {
    background: rgba(255, 255, 255, 0.16);
  }
`;
