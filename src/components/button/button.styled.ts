import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  margin?: string;
  width?: string;
  height?: string;
}

export const ButtonStyled = styled(motion.button)<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '50px'};
  text-align: center;
  cursor: pointer;
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
