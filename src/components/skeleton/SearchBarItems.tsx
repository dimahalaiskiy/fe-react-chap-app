import { Skeleton } from "./Skeleton";
import styled from "styled-components";

export interface SkeletonsProps {
  amount?: number | undefined;
}

export const SearchBarItemsSkeletons: React.FC<SkeletonsProps> = ({ amount }) => {
  const amountOfSkeletons = new Array(amount ?? 0).fill(1);
  return (
    <SearchBarWrapper>
      {amountOfSkeletons.map((skeleton, index) => {
        return <Skeleton key={index} width="100%" height="44px" borderRadius="5px" />;
      })}
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
