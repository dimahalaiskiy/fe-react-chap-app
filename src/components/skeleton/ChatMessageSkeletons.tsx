import { Skeleton } from "./Skeleton";
import styled from "styled-components";

export interface ChatMessageSkeletonsProps {
  amount?: number;
}

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const MessageSkeletonContainer = styled.div<{ isRight?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.isRight ? "flex-end" : "flex-start")};
`;

const MessageSkeleton = styled(Skeleton)<{ isRight?: boolean }>`
  max-width: 60%;
  min-width: 100px;
  height: 40px;
  border-radius: 16px;
`;

export const ChatMessageSkeletons: React.FC<ChatMessageSkeletonsProps> = ({ amount = 6 }) => {
  const skeletons = Array(amount).fill(0);

  return (
    <SkeletonWrapper>
      {skeletons.map((_, index) => {
        const isRight = index % 2 === 1;

        return (
          <MessageSkeletonContainer key={index} isRight={isRight}>
            <MessageSkeleton
              width={`${Math.floor(30 + Math.random() * 40)}%`}
              height={`${Math.floor(35 + Math.random() * 20)}px`}
              borderRadius="16px"
            />
          </MessageSkeletonContainer>
        );
      })}
    </SkeletonWrapper>
  );
};
