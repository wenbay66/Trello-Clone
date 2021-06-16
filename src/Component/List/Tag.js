import React,{useState, useEffect, useContext } from 'react';
//context
import { TagContext } from '../../Container';
import styled from "styled-components";
/*const animat = keyframes`
    0% {
        width: 30px;
    }   
    100% {
        width: auto;
    }animation: ${animat} 2s ease-in;
`;*/
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const Div = styled.div`
    font-weight: 700;
    font-size: 12px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
    background-color: ${props => props.bgColor ? props.bgColor : ''};
    border-radius: 4px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    min-height: 8px;
    max-height: 16px;
    line-height: 16px;
    min-width: 30px;
    max-width: 198px;
    transition: width 2s ease;
    margin: 0px 4px 0px 0px;
    padding: 0px 8px 0px 8px;
    text-align: center;
    &:hover{
        filter: brightness(90%);
        color: rgb(255, 255, 255);
    }
`
export default function Tag({tagID}) {
    const [Data, setData] = useState(null)
    const {AllTagData, ShowMode, setShowMode} = useContext(TagContext);
    //改成顯示精簡模式
    const fnc = (event) => {
        event.stopPropagation();
        setShowMode(!ShowMode);
    }
    useEffect(() => {
        if(AllTagData && tagID){
            let data = AllTagData.find(e => e.tagID === tagID);
            setData(data);
        }
    },[AllTagData, tagID])
    return (
        <Wrapper>
            {tagID && Data ? (
                <Div onClick={fnc} bgColor={Data.bgColor}>{ShowMode ? Data.tagName : ''}</Div>
            ) : (
                <div />
            )}
        </Wrapper>
    )
}