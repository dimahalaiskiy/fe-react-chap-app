/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import { showErrorToast } from "@/utils/toastUtils";

import {
  SearchBarWrapper,
  SearchResults,
  UsersListContainer,
  UserItemContainer,
  EmptyResults,
  Username,
  LoadingMore,
} from "./searchUsers.styled";
import { SearchBarItemsSkeletons } from "@/components/skeleton/SearchBarItems";
import { Input } from "@/components/input/Input";

import { CoreApiProvider } from "@/services/api";

import { User } from "@/types";
import { Avatar } from "@/components/avatar/Avatar";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useModalStore } from "@/store/useModalStore";
import { useSocket } from "@/hooks/useSocket";

interface UsersListProps {
  users: User[];
  skip: number;
  fetchMoreUsers: () => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, fetchMoreUsers, skip }) => {
  const { closeModal } = useModalStore();
  const { createChat: createChatSocket } = useSocket();

  const hasMore = !!skip;

  const createChat = async (recipientId: string) => {
    try {
      await createChatSocket(recipientId);
      closeModal();
    } catch (error) {
      console.log("error", error);
      showErrorToast("Cannot create chat");
    }
  };

  if (users?.length === 0) {
    return <EmptyResults>No users Found</EmptyResults>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreUsers}
        hasMore={hasMore}
        loader={<LoadingMore>Loading more users...</LoadingMore>}
        scrollableTarget="users-list-container"
        endMessage={
          <p style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.5)", marginTop: "10px" }}>
            All users have been loaded
          </p>
        }
      >
        <UsersListContainer>
          {users?.map((user: User) => (
            <UserItemContainer key={user.id} onClick={() => createChat(user.id)}>
              <Avatar user={user} />
              <Username>{user.username}</Username>
            </UserItemContainer>
          ))}
        </UsersListContainer>
      </InfiniteScroll>
    </>
  );
};

const LIMIT = 10;

export const SearchBar = () => {
  const input = useRef<HTMLInputElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const { isClickedOutside } = useClickOutside(wrapper);

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
    setSkip(0);
    setUsers([]);
  };

  const onFocus = () => {
    input?.current?.focus();
    if (users.length === 0) {
      getUsers();
    }
  };

  const getUsers = async (isLoadingMore = false) => {
    if (!isLoadingMore) {
      setIsLoading(true);
    }

    try {
      const { data } = await CoreApiProvider.getUsers({
        query: searchValue,
        skip,
        limit: LIMIT,
      });

      const {
        rows,
        pagination: { skip: newSkip },
      } = data;

      isLoadingMore ? setUsers((prevUsers) => [...prevUsers, ...rows]) : setUsers(rows);

      setSkip(newSkip);
    } catch (error) {
      showErrorToast("Cannot find users");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreUsers = () => {
    if (!isLoading && skip) {
      getUsers(true);
    }
  };

  const getUsersOnQueryDebounced = debounce(() => {
    setIsLoading(true);
    setSkip(0);
    setUsers([]);
    getUsers();
  }, 500);

  useEffect(() => {
    getUsersOnQueryDebounced();

    return () => getUsersOnQueryDebounced.cancel();
  }, [searchValue, isClickedOutside]);

  return (
    <SearchBarWrapper ref={wrapper}>
      <Input
        ref={input}
        placeholder="Search users..."
        padding="0 10px"
        height="44px"
        value={searchValue}
        onFocus={onFocus}
        setValue={onInput}
      />
      <SearchResults id="users-list-container">
        {!isLoading ? (
          <UsersList users={users} fetchMoreUsers={fetchMoreUsers} skip={skip} />
        ) : (
          <SearchBarItemsSkeletons amount={6} />
        )}
      </SearchResults>
    </SearchBarWrapper>
  );
};
