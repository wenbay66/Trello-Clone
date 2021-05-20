import React from 'react';
import styled from "styled-components";
const Button = styled.button`
    cursor:pointer;
    border-style: none;
    padding: 6px;
    height: 32px;
    border-radius: 3px;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-stretch: 100%;
    font-style: normal;
    font-variant-caps: normal;
    font-variant-east-asian: normal;
    font-variant-ligatures: normal;
    font-variant-numeric: normal;
    letter-spacing: normal;
    outline: none;
    background-color: rgba(255, 255, 255 ,0.2);
    backdrop-filter: blur(4px);
    &:hover {
        background-color: rgba(255, 255, 255 ,0.3);
      }
`
export default function Btn(props){
    return (
        <>
            <Button>
                {props.children}
            </Button>
        </>
    )
}