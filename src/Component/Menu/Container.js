import React,{useContext} from 'react';
import styled,{keyframes} from "styled-components";
//component
import Button from './Button';
//Context
import {ThemeContext} from '../../App';
//icon
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
const animat = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
`;
const Wrapper = styled.div`
  dislay: flex;
  flex-direction: column;
  width: 100%;
  position:relative;
  animation: ${animat} .2s ease-in;
`
const ColorPicker = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color ? props.color : ''};
  border-radius: 3px;
`
const Hr = {
    margin: '20px 0 20px 0',
    borderTop: '1px solid #D5D9E0',
}
export default function Container(){
  const Context = useContext(ThemeContext);
  return(
    <Wrapper>
      <Button MainTitle='關於這個看板' SubTitle='為你的看板新增標題' Component='Border' >
          <ListAltOutlinedIcon />
      </Button>
      <Button MainTitle='更換背景' Component='Background' >
          <ColorPicker color={Context.Theme.value} />
      </Button>
      <Button MainTitle='搜尋卡片' Component='SearchCard' >
          <SearchOutlinedIcon />
      </Button>
      <Button MainTitle='貼圖' Component='Picture' >
          <SentimentSatisfiedOutlinedIcon />
      </Button>
      <Button MainTitle='更多' Component='More' >
          <MoreHorizOutlinedIcon />
      </Button>
      <div style={Hr} />
    </Wrapper>
  )
}