import { Skeleton } from "./Skeleton";
import styled from "styled-components";

export const SearchBarItems = () => {
  return (
    <SearchBarWrapper>
      <Skeleton width="100%" height="30px" borderRadius="5px" />
      <Skeleton width="100%" height="30px" borderRadius="5px" />
      <Skeleton width="100%" height="30px" borderRadius="5px" />
      <Skeleton width="100%" height="30px" borderRadius="5px" />
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
