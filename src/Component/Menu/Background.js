import React,{ useContext } from 'react';
import styled,{keyframes} from "styled-components";
//component
import { GoNextContext } from './Menu';
import Box from './Box';
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
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  padding: 0px 6px 0px 6px;
  width: 100%;
  position:relative;
  animation: ${animat} .1s ease-in;
  overflow: scroll;
`
export default function Background(){
  const ColorUrl = 'https://htmlcolorcodes.com/assets/images/html-color-codes-color-palette-generators.jpg';
  //const ImgUrl = 'https://lh3.googleusercontent.com/4mVNVUybMXXJ5k-PuXHwqwBFDLUZbAuSxa7xcypndKhFZ9RPEGVcoXpU9mLQL6lGg3z3Cvp5pJFWDXwKiYDPWOH9zQ=w640-h400-e365-rj-sc0x00ffffff'
  const GoNext = useContext(GoNextContext);
  return(
    <Wrapper>
      <Box url={ColorUrl} text='顏色' fnc={() => GoNext('Color', '顏色')} />
    </Wrapper>
  )
}