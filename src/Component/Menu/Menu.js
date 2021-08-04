import React,{useState} from 'react';
import styled from "styled-components";
//component
import Title from "./Title";
import Container from './Container';
//temp
import Border from './Border';
import Background from './Background';
import SearchCard from './SearchCard';
import Picture from './Picture';
import SetTag from './SetTag';
import Color from './Color';
import More from './More';
const Wrapper = styled.div`
  background-color: #F4F5F7;
  width: 100%;
  height: 100%;
`
const ContainerDIV = styled.div`
  padding: 12px 6px 12px 6px;
  display: flex;
  flex-direction: row;
  height: calc(100% - 60px);
  overflow-y: scroll
`
const Components = {
  'Border': {
    'Component': Border,
    'title': '關於這個看板'
  },
  'Background': {
    'Component': Background,
    'title': '更換背景'
  },
  'Color': {
    'Component': Color,
    'title': '顏色'
  },
  'SearchCard': {
    'Component': SearchCard,
    'title': '搜尋卡片'
  },
  'Picture': {
    'Component': Picture,
    'title': '照片'
  },
  'SetTag': {
    'Component': SetTag,
    'title': '標籤'
  },
  'More': {
    'Component': More,
    'title': '更多'
  }
}
export const GoNextContext = React.createContext();

export default function Menu({isOpen, handleClose}){
  const [ComponentList, setComponentList] = useState([]);
  //回上一個 Component
  const GoBack = () => {
    const _ComponentList = [...ComponentList];
    _ComponentList.pop();
    setComponentList(_ComponentList);
  }
  //去下一個 Component
  const GoNext = (NextComponent, NextTitleText) => {
    const _ComponentList = [...ComponentList];
    _ComponentList.push(Components[NextComponent]);
    setComponentList(_ComponentList);
  }
  const Component = ComponentList.length !== 0 ? (
    ComponentList[ComponentList.length - 1].Component
  ) : null;
  return(
    <GoNextContext.Provider value={GoNext}>
      <Wrapper>
        <Title handleClose={handleClose} ComponentList={ComponentList} GoBack={GoBack} />
        <ContainerDIV>
          {ComponentList.length===0 ? <Container /> : <Component />}
        </ContainerDIV>
      </Wrapper>
    </GoNextContext.Provider>
  )
}