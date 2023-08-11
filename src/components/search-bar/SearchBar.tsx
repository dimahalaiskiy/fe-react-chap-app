/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, ChangeEvent } from "react";

import debounce from "lodash.debounce";

import api from "../../services/api/core";

import {
  SearchBarWrapper,
  InputWrapper,
  SearchBarInput,
  SearchButton,
  SearchResults,
} from "./searchBar.styled";

import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { toast } from "react-hot-toast";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState({ rows: [], count: null });

  const input = useRef(null);
  const EMPTY_VALUE = value === "";

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (!isFocused) return;

    const getUsersOnQueryDebounced = debounce(async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          `/users?skip=${users.rows.length}&limit=2&query=${value}`
        );
        setUsers(data);
      } catch (error) {
        toast.error("Cannot find users");
      } finally {
        setIsLoading(false);
      }
    }, 500);

    getUsersOnQueryDebounced();

    return () => getUsersOnQueryDebounced.cancel();
  }, [value, isFocused]);

  return (
    <SearchBarWrapper>
      <InputWrapper>
        <SearchBarInput
          ref={input}
          value={value}
          placeholder="Search users..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onInput}
        />
        {EMPTY_VALUE && !isFocused ? (
          <SearchButton onClick={() => input?.current?.focus()}>
            <SearchIcon style={{ marginRight: "12px" }} />
          </SearchButton>
        ) : (
          ""
        )}
      </InputWrapper>
      {isFocused ? <SearchResults></SearchResults> : null}
    </SearchBarWrapper>
  );
};
