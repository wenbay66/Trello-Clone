import React from 'react';
import styled from "styled-components";
//component
import Btn from "../Btn/Btn"
import AppsIcon from '@material-ui/icons/Apps';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';

const Container = styled.div`
    max-height: 40px;
    min-height: 40px;
    box-sizing: border-box;
    background: ${props => props.color ? props.color : ''};
    padding: 4px 8px 4px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ContainerDIV = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${props => props.paddingLeft ? props.paddingLeft : ''}
`
const TitleBtn = styled.span`
    font-weight: 700;
    font-size: 14px;
    margin-left: 3px;
    margin-right: 6px;
` 
const ImgDIV = styled.div`
  background-image: url(https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif);
  height: 16px;
  width:80px;
  opacity: 0.5;
  &:hover{
    opacity: 0.8
  }
  position: absolute;
  left: 50%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`
export default function Header({Theme}){
  const ColorMap = {'#1A79BF':'#1467A3', '#D29034':'#B37B2C', '#519839':'#458130', '#B04632':'#963C2B', '#89609E':'#755286', '#CD5A91':'#AE4D7C', '#4BBF6B':'#40A35B', '#00AECC':'#2194AE', '#838C91':'#70777B'}
  return (
    <Container color={Theme.type === 'color' ? ColorMap[Theme.value] : ''} BgUrl={Theme.type === 'url' ? Theme.value : ''}>
      <ContainerDIV paddingLeft='4px'>
        <span>
          <Btn>
            <AppsIcon />
          </Btn>
        </span>
        <span style={{marginLeft:'4px'}}>
          <Btn>
            <HomeOutlinedIcon />
          </Btn>
        </span>
        <span style={{marginLeft:'4px'}}>
          <Btn>
            <BookmarkBorderIcon />
            <TitleBtn>看板</TitleBtn>
          </Btn>
        </span>
        <span style={{marginLeft:'4px'}}>
          <Btn>
            <span style={{width:'184px',textAlign:'left'}}>跳到...</span>
            <SearchIcon />
          </Btn>
        </span>
      </ContainerDIV>
      <ImgDIV></ImgDIV>
      <ContainerDIV>
        <span>
          <Btn><AddIcon /></Btn>
        </span>
        <span style={{marginLeft:'4px'}}>
          <Btn><ErrorOutlineIcon /></Btn>
        </span>
        <span style={{marginLeft:'4px'}}>
          <Btn><NotificationsOutlinedIcon /></Btn>
        </span>
      </ContainerDIV>
    </Container>
  )
}