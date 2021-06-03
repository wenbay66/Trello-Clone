import React,{useContext} from 'react';
//Component
import Box from './Box';
//context
import {ThemeContext} from '../../App';
import styled,{keyframes} from "styled-components";
const animat = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0%;
  }
`;
const Wrapper = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 0px 6px 0px 6px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  animation: ${animat} .1s ease-in;
`
export default function Color(){
    const ColorList = ['#0079BF', '#D29034', '#519839', '#B04632', '#89609E', '#CD5A91', '#4BBF6B', '#00AECC', '#838C91'];
    const Context = useContext(ThemeContext);
    //const Theme = Context.Theme;
    const CheseTheme = Context.CheseTheme;
    const data = ColorList.map((item, index) => {
        return <Box key={index} BgColor={item} fnc={() => CheseTheme('color', item)} />
    })
    return(
        <Wrapper>
            {data}
        </Wrapper>
    )
}