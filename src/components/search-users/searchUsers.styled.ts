import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  background-color: transparent;
  cursor: pointer;
`;

export const SearchResults = styled.ul`
  position: absolute;
  margin-top: 8px;
  width: 450px;
  max-height: 350px;
  padding-right: 3px;
  overflow-y: auto;
`;

export const UsersListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UserItemContainer = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 6px;
  background-color: rgba(255, 255, 255, 0.08);
  &:hover {
    background-color: rgba(255, 255, 255, 0.16);
  }
  transition: background-color 0.2s ease-out;
`;

export const Username = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
`;

export const ActionButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const EmptyResults = styled.div`
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 16px;
  font-weight: 500;
  height: 250px;
`;

export const LoadingMore = styled.div`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 10px;
  font-size: 14px;
  margin-top: 8px;
`;
