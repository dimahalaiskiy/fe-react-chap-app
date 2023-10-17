import React from "react";
import styled, { keyframes } from "styled-components";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const SkeletonAnimation = keyframes`
  0% { background-position: -200% 0 }
  100% { background-position: 200% 0 }
`;

const SkeletonContainer = styled.div<SkeletonProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  background-image: linear-gradient(90deg, #444 25%, #333 50%, #444 75%);
  background-size: 200% 100%;
  animation: ${SkeletonAnimation} 1.5s infinite;
  border-radius: ${(props) => props.borderRadius || "0"};
`;

export const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius }) => {
  return <SkeletonContainer width={width} height={height} borderRadius={borderRadius} />;
};
