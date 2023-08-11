import styled from "styled-components";

export const SearchBarWrapper = styled.section`
  background-color: transparent;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  min-width: 265px;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background-color: transparent;
`;
export const SearchBarInput = styled.input`
  background-color: transparent;
  border: none;
  padding: 12px;
  outline: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  ::placeholder {
    font-size: 12px;
  }
`;

export const SearchButton = styled.button`
  cursor: pointer;
  color: #373530;
  :hover {
    color: white;
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  margin-top: 8px;
  min-height: 250px;
  min-width: 265px;
  max-width: 265px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
`;
