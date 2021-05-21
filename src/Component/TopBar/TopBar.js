import React from 'react';
import styled from "styled-components";
//component
import Btn from "../Btn/Btn"
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import LockIcon from '@material-ui/icons/Lock';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Container = styled.div`
    max-height: 40px;
    min-height: 40px;
    background: rgb(1,121,191);
    padding: 4px 8px 4px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TitleBtn = styled.span`
    font-weight: 700;
    font-size: 18px;
    margin-left: 6px;
    margin-right: 6px;
` 
const Border = styled.span`
    border-left-color: rgba(255, 255, 255, 0.24);
    border-left-style: solid;
    border-left-width: 1px;
    height: 16px;
    margin-left: 8px;
    margin-right: 8px;
`
const ContainerDIV = styled.div`
  display: flex;
  align-items: center;
`

export default function TopBar(){
  const ccc = ()=>{
      alert('123')
  }
  return (
    <>
      <Container>
        <ContainerDIV>
          <span onClick={ccc}>
            <Btn>
                <FormatListBulletedRoundedIcon style={{fontSize:14}}/>
                <span>看板</span>
                <KeyboardArrowDownRoundedIcon/>
            </Btn>
          </span>
          <span onClick={ccc} style={{marginLeft:'4px'}}>
            <Btn>
                <TitleBtn>程式roadMap</TitleBtn>
            </Btn>
          </span>
          <span style={{marginLeft:'4px'}}>
            <Btn>
                <StarBorderOutlinedIcon />
            </Btn>
          </span>
          <Border />
          <span>
            <Btn>
                <span style={{padding:'0px 4px 0px 4px'}}>jen wen 的工作區</span>
            </Btn>
          </span>
          <Border />
          <span>
            <Btn>
              <LockIcon style={{fontSize:14}}/>
              <span style={{padding:'0px 4px 0px 4px'}}>私密</span>
            </Btn>
          </span>
          <Border />
          <span>
            <Btn>
              <span style={{padding:'0px 10px 0px 10px'}}>邀請</span>
            </Btn>
          </span>
        </ContainerDIV>
        <ContainerDIV>
          <span>
            <Btn>
              <RoomServiceIcon/>
              <span style={{padding:'0px 4px 0px 6px'}}>Bulter</span>
            </Btn>
          </span>
          <span style={{marginLeft:'4px'}}>
            <Btn>
              <MoreHorizIcon style={{fontSize:'medium'}}/>
              <span style={{padding:'0px 4px 0px 6px'}}>顯示選單</span>
            </Btn>
          </span>
        </ContainerDIV>
      </Container>
    </>
  )
}