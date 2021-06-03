import React from 'react';
import styled from "styled-components";
const Span = styled.div`
    font-weight: 700;
    font-size: 12px;
    background-color: rgb(97, 189, 79);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    height: 16px;
    line-height: 16px;
    min-width: 40px;
    max-width: 198px;
    margin: 0px 4px 0px 0px;
    padding: 0px 8px 0px 8px;
    text-align: center;
    &:hover{
        filter: brightness(90%);
        color: rgb(255, 255, 255);
    }
`
export default function Tag({tagID}) {
    const fnc = () => alert(`123`);
    const data = tagID ? (
        <Span onClick={fnc}>React</Span>
    ) : (
        <div />
    )
    
    return <>{data}</>
}