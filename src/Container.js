import React,{useState, useEffect} from 'react';
import styled from "styled-components";
//Component
import Wrapper from "./Component/List/Wrapper";
import TopBar from "./Component/TopBar/TopBar";
import Menu from "./Component/Menu/Menu";
//API
//import db from '../src/API';
export const OpenContext = React.createContext();
export const TagContext = React.createContext();
const WrapperContainer = styled.div`
  display: flex;
  height: calc(100% - 40px);
`
const LeftContainer = styled.div`
  width: ${props => props.isOpen ? '80%' : '100%'};
  height: 100%;
  transition: width .1s ease-in
`
const RightContainer = styled.div`
  width: ${props => props.isOpen ? '20%' : '0%'};
  position: relative;
  transition: width .1s ease-in;
  height: 100%;
`
const Container = () => {
  const [isOpen, setisOpen] = useState(true);
  const [AllTagData, setAllTagData] = useState(null);   //標籤資料
  const [ShowMode, setShowMode] = useState(true);       //標籤顯示模式
  //TagData之後要改成串接firebase API
  useEffect(() => {
    const TestTagData = [
      {
        tagID: 'tag-1',
        tagName: 'Node.js',
        bgColor: '#61BD50'
      },
      {
        tagID: 'tag-2',
        tagName: 'JavaScript',
        bgColor: '#F2D600'
      },
      {
        tagID: 'tag-3',
        tagName: '工具類',
        bgColor: '#FB9F1A'
      },
      {
        tagID: 'tag-4',
        tagName: '其他',
        bgColor: '#EB5A46'
      },
      {
        tagID: 'tag-5',
        tagName: 'React',
        bgColor: '#1A79BF'
      },
      {
        tagID: 'tag-6',
        tagName: 'Vue.js',
        bgColor: '#61BD50'
      }
    ]
    setAllTagData(TestTagData)
  },[])
  const TagContext_Obj = {AllTagData, setAllTagData, ShowMode, setShowMode}
  return(
    <WrapperContainer>
      <OpenContext.Provider value={{isOpen, setisOpen}}>
        <TagContext.Provider value={{TagContext_Obj}}>
          <LeftContainer isOpen={isOpen}>
            <TopBar />
            <Wrapper />
          </LeftContainer>
          <RightContainer isOpen={isOpen}>
            {isOpen ? (
              <Menu isOpen={isOpen} handleClose={() => setisOpen(false)} />
            ) : null}
          </RightContainer>
        </TagContext.Provider>
      </OpenContext.Provider>
    </WrapperContainer>
  )
}

export default Container;