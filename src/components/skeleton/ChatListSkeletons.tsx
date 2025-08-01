import { Skeleton } from "./Skeleton";
import styled from "styled-components";

export interface ChatListSkeletonsProps {
  amount?: number;
}

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0px 8px;
`;

const ChatItemSkeleton = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.03);
`;

const AvatarSkeleton = styled.div`
  margin-right: 12px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 70%;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  width: 20%;
`;

export const ChatListSkeletons: React.FC<ChatListSkeletonsProps> = ({ amount = 5 }) => {
  const skeletons = Array(amount).fill(0);

  return (
    <SkeletonWrapper>
      {skeletons.map((_, index) => (
        <ChatItemSkeleton key={index}>
          <AvatarSkeleton>
            <Skeleton width="40px" height="40px" borderRadius="50%" />
          </AvatarSkeleton>
          <ContentWrapper>
            <LeftContent>
              <Skeleton width="80%" height="16px" borderRadius="4px" />
              <Skeleton width="100%" height="14px" borderRadius="4px" />
            </LeftContent>
            <RightContent>
              <Skeleton width="100%" height="12px" borderRadius="4px" />
              {Math.random() > 0.6 && <Skeleton width="20px" height="20px" borderRadius="50%" />}
            </RightContent>
          </ContentWrapper>
        </ChatItemSkeleton>
      ))}
    </SkeletonWrapper>
  );
};
