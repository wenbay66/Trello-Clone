import React from 'react';
import styled from "styled-components";
const Wrapper = styled.div`
    width: 47%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 6px;
    margin-left: 1.5%;
    margin-right: 1.5%;
`
const Picture = styled.div`
  width: 100%;
  height: 96px;
  background-image: url(${props => props.url ? props.url : ''});
  background-color: ${props => props.BgColor ? props.BgColor : ''};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  &:hover{
    cursor: pointer;
    opacity: 0.7;
  };   
};
`
const Text = styled.span`
    margin-top: 8px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
    color: rgb(23, 43, 77);
    font-weight: 400;

`
export default function Box(props){
    //const _fnc = () => props.fnc ? fnc(Component, MainTitle) : undefined;
    return (
        <Wrapper onClick={props.fnc}>
            <Picture url={props.url} BgColor={props.BgColor} />
            <Text>{props.text}</Text>
        </Wrapper>
    )
}