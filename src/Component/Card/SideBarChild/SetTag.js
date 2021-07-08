import React, {useState} from 'react';
import styled from "styled-components";
const Wrapper = styled.div`
  dislay: flex;
  flex-direction: column;
  align-items: center;
`
const SearchBox = styled.input`
  box-sizing:border-box;
  width: 100%;
  padding: 8px 12px 8px 12px;
  margin-bottom: 12px;
  outline-style: none;
  background-origin: padding-box;
  background-clip: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  border: 2px solid #D5D9E0;
  font-weight: 400;
  ::-webkit-input-placeholder {
    color: #5e6c84;
  }
  &:focus {
    border: 2px solid #0079bf;
  }
`

const SetTag = () => {
  const [SearchText, setSearchText] = useState('');
  return(
    <Wrapper>
      <SearchBox placeholder='搜尋標籤...' onChange={(e) => setSearchText(e.target.value)} />
    </Wrapper>
  )
}
export default SetTag;