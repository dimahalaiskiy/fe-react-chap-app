/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useAnimate, stagger } from 'framer-motion';
import debounce from 'lodash.debounce';

import { CoreApiProvider } from '../../services/api';

import { SearchBarWrapper, InputWrapper, SearchBarInput, Search, SearchResults } from './searchBar.styled';

import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { toast } from 'react-hot-toast';

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

export const SearchBar = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState({ rows: [], count: null });

  const [scope, animate] = useAnimate();

  const input = useRef(null);
  const EMPTY_VALUE = value === '';

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const focusInput = () => {
    input?.current?.focus();
  };

  const toggleInputDropdown = () => {
    if (!isOpen) focusInput();
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const getUsersOnQueryDebounced = debounce(async () => {
      setIsLoading(true);
      try {
        const { data } = await CoreApiProvider.getUsers({ query: value, skip: users.rows.length, limit: 10 });
        setUsers(data);
      } catch (error) {
        toast.error('Cannot find users');
      } finally {
        setIsLoading(false);
      }
    }, 500);

    getUsersOnQueryDebounced();

    return () => getUsersOnQueryDebounced.cancel();
  }, []);

  useEffect(() => {
    animate('.arrow', { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      'ul',
      { clipPath: isOpen ? 'inset(0% 0% 0% 0% round 10px)' : 'inset(10% 50% 90% 50% round 10px)' },
      { type: 'spring', bounce: 0, duration: 0.5 },
    );

    animate(
      'li',
      isOpen ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      { duration: 0.2, delay: isOpen ? staggerMenuItems : 0 },
    );
  }, [isOpen]);

  return (
    <>
      <SearchBarWrapper onClick={toggleInputDropdown}>
        <InputWrapper whileTap={{ scale: 0.95 }}>
          <SearchBarInput
            ref={input}
            value={value}
            placeholder="Search users..."
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            onChange={onInput}
          />
          {EMPTY_VALUE && !isOpen ? (
            <Search>
              <SearchIcon style={{ marginRight: '12px' }} />
            </Search>
          ) : (
            ''
          )}
        </InputWrapper>
        {isOpen ? (
          <SearchResults
            style={{
              pointerEvents: isOpen ? 'auto' : 'none',
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
            }}
          />
        ) : null}
      </SearchBarWrapper>
    </>
  );
};
