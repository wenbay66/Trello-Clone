import React from 'react';
import styled from "styled-components";
const Button = styled.button`
    cursor:pointer;
    padding: 6px;
    height: 32px;
    border-style: none;
    border-radius: 3px;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-variant-caps: normal;
    font-variant-east-asian: normal;
    font-variant-ligatures: normal;
    font-variant-numeric: normal;
    outline: none;
    background-color: rgba(255, 255, 255 ,0.3);
    &:hover {
        background-color: rgba(255, 255, 255 ,0.4);
      }
`
export default function Btn(props){
  const fnc = () => props.fnc ? props.fnc() : undefined;
  return (
    <>
      <Button onClick={fnc}>
        {props.children}
      </Button>
    </>
  )
}