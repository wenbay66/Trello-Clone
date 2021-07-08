import React, {useContext} from 'react';
import styled,{keyframes} from "styled-components";
//component
import Button from './Button';
//icon
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined';
//context
import {TagContext} from '../../Container';
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
  const {TagContext_Obj} = useContext(TagContext);
  //propsObj用法參照Button.js
  const tagProps = {
    'Name': 'TagContext_Obj',
    'Obj': TagContext_Obj
  }
  return(
    <Wrapper>
      <Button MainTitle='設定' Component='SetUp'>
        <SettingsOutlinedIcon />
      </Button>
      <Button MainTitle='標籤' Component='SetTag' propsObj={tagProps}>
        <MoreOutlinedIcon />
      </Button>
    </Wrapper>
  )
}