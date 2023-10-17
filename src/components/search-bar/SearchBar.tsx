/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, ChangeEvent } from "react";
import debounce from "lodash.debounce";

import { CoreApiProvider } from "../../services/api";

import { SearchBarItems } from "../skeleton/SearchBarItems";
import { SearchBarWrapper, InputWrapper, SearchBarInput, Search, SearchResults } from "./searchBar.styled";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { toast } from "react-hot-toast";
import { UserResponse } from "../../types";

export const SearchBar = () => {
  const input = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserResponse>({ rows: [], count: null });

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const focusInput = () => {
    input?.current?.focus();
  };

  const onFocus = () => {
    setIsOpen(true);
    focusInput();
  };

  const getUsersOnQueryDebounced = debounce(async () => {
    setIsLoading(true);
    try {
      const { data }: { data: UserResponse } = await CoreApiProvider.getUsers({
        query: value,
        skip: users.rows.length,
        limit: 10,
      });
      setUsers(data);
    } catch (error) {
      toast.error("Cannot find users");
    } finally {
      setIsLoading(false);
    }
  }, 500);

  useEffect(() => {
    if (!isOpen) return;
    getUsersOnQueryDebounced();

    return () => getUsersOnQueryDebounced.cancel();
  }, [value]);

  return (
    <>
      <SearchBarWrapper>
        <InputWrapper>
          <SearchBarInput
            ref={input}
            value={value}
            placeholder="Search users..."
            onFocus={onFocus}
            onBlur={() => setIsOpen(false)}
            onChange={onInput}
          />
          {value === "" && !isOpen ? (
            <Search onClick={focusInput}>
              <SearchIcon style={{ marginRight: "12px" }} />
            </Search>
          ) : (
            ""
          )}
        </InputWrapper>
        {isOpen ? (
          <SearchResults
            style={{
              pointerEvents: isOpen ? "auto" : "none",
            }}
          >
            <SearchBarItems />
          </SearchResults>
        ) : null}
      </SearchBarWrapper>
    </>
  );
};
