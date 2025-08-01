import { SocketConnection, useGlobalStore } from "@/store/useGlobalStore";
import styled from "styled-components";

const StatusIndicator = styled.div<{ isConnected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ isConnected }) => (isConnected ? "#33d17a" : "#f66151")};
  background-color: ${({ isConnected }) =>
    isConnected ? "rgba(51, 209, 122, 0.1)" : "rgba(246, 97, 81, 0.1)"};
  transition: all 0.3s ease;
`;

const StatusDot = styled.div<{ isConnected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isConnected }) => (isConnected ? "#33d17a" : "#f66151")};
  animation: ${({ isConnected }) => (isConnected ? "pulse 2s infinite" : "none")};

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const SocketStatus = () => {
  const { socketConnection } = useGlobalStore();

  const isConnected = socketConnection === SocketConnection.CONNECTED;

  return (
    <StatusIndicator isConnected={isConnected}>
      <StatusDot isConnected={isConnected} />
      {isConnected ? "Connected" : "Disconnected"}
    </StatusIndicator>
  );
};
