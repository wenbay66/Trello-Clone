import React, { useRef } from 'react';
import styled from "styled-components";
const Wrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  background-color: rgba(9,30,66,.04);
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  height: 32px;
  padding: 6px 12px 6px 12px;
  margin-top:8px;
  font-size: 14px;
  font-weight: 400;
  &:hover {
    background-color: #E2E4E9;
  }
`
const Box = ({children, name, ComponentName, fnc}) => {
  const Ref = useRef();
  return(
    <Wrapper ref={Ref} onClick={() => fnc(Ref.current.getBoundingClientRect(), name, ComponentName)}>
      {children}
      {name}
    </Wrapper>
  )
}
export default Box;