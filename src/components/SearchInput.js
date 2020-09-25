import React from 'react';
import styled from 'styled-components';
import SearchIcon from './icons/SeachIcon';

const InputField = styled.input`
  background: transparent;
  border: none;
  flex: 1;

  :focus {
    outline: none;
  }
`;

const SearchContainer = styled.div`
  background-color: rgba(244, 246, 255, 0.8);
  margin: 8px auto;
  width: 100%;
  max-width: 400px;
  display: flex

  :hover {
    background: #fafafa;
  }
`;

export default function SearchInput() {
  return (
    <SearchContainer>
      <SearchIcon />
      <InputField />
    </SearchContainer>
  );
}
