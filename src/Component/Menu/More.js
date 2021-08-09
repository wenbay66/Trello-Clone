import React from 'react';
import styled,{keyframes} from "styled-components";
//component
import Button from './Button';
//icon
import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined';
const animat = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0%;
  }
`;
const Wrapper = styled.div`
  dislay: flex;
  flex-direction: column;
  padding: 0px 6px 0px 0px;
  width: 100%;
  position:relative;
  animation: ${animat} .1s ease-in;
`

export default function More(){
  return(
    <Wrapper>
      <Button MainTitle='標籤' Component='SetTag'>
        <MoreOutlinedIcon />
      </Button>
    </Wrapper>
  )
}