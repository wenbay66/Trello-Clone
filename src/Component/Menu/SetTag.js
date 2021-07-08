import React,{useState, useEffect, useContext, useRef} from 'react';
import styled,{keyframes} from "styled-components";
//component
import Panel from '../../Panel';
import Tag from './Tag';
import ModifyTag from './ModifyTag';
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
  padding: 0px 8px 0px 8px;
  width: 100%;
  position:relative;
  animation: ${animat} .1s ease-in;
`
const SearchBox = styled.input`
  box-sizing:border-box;
  width: 100%;
  padding: 8px 12px 8px 12px;
  margin-bottom: 12px;
  outline-style: none;
  background-origin: padding-box;
  background-clip: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  border: 2px solid #D5D9E0;
  font-weight: 400;
  ::-webkit-input-placeholder {
    color: #5e6c84;
  }
  &:focus {
    border: 2px solid #0079bf;
  }
`
const H4 = styled.h4`
  color: #5E6C84;
  margin-bottom: 12px;
`
const Button = styled.button`
  margin-top: 15px;
  padding: 8px 0px 8px 0px;
  width: 100%;
  background-color: rgba(9,30,66,.04);
  cursor: pointer;
  border-radius: 3px;
  color: rgb(23, 43, 77);
  font-size: 14px;
  font-weight: 400;
  outline: none;
  border: none;
  &:hover{
    background-color: #E2E4E9;
  }
`
const SetTag = () => {
  const [UIdata, setUIdata] = useState(null);
  const [oriUIdata, setoriUIdata] = useState(null);
  const [SearchText, setSearchText] = useState('');
  const {TagContext_Obj} = useContext(TagContext);
  const {AllTagData, setAllTagData} = TagContext_Obj;
  const btnRef = useRef();
  //建立全新標籤
  const CreateTag = (event) => {
    const client = btnRef.current.getBoundingClientRect();
    //top、left、width、tagName
    const Top = `${client.y + client.height + 2}px`; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
    const Left = `${client.x}px`;                    //加上半個 icon 的寬度比較好看
    const width = `${client.width}px`;               //需扣掉半個 icon 寬度
    const propsObj = { //有參數統一塞進這裡
      AllTagData: AllTagData,
      setAllTagData: setAllTagData
    };
    Panel.open({Top, Left, width, propsObj, component: ModifyTag, Title: '新增標籤'})
  }
  //修改標籤
  const fnc = (client, tagIndex) => {
    //top、left、width、tagName
    const Top = `${client.y + client.height + 2}px`; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
    const Left = `${client.x + 16}px`;               //加上半個 icon 的寬度比較好看
    const width = `${client.width - 16}px`;          //需扣掉半個 icon 寬度
    const propsObj = {
      tagData: AllTagData[tagIndex],
      AllTagData: AllTagData,
      setAllTagData: setAllTagData
    }
    Panel.open({Top, Left, width, propsObj, component: ModifyTag, Title: '修改標籤'})
  }
  //get tag data .
  useEffect(() => {
    if (AllTagData === null) return;
    const _UIdata = AllTagData.map((item,index) => {
      return <Tag data={item} key={index} dataIndex={index} fnc={fnc} />
    })
    setUIdata(_UIdata);
    setoriUIdata(_UIdata);
  },[AllTagData])// eslint-disable-line react-hooks/exhaustive-deps
  //According SearchText change UI data.
  useEffect(() => {
    const search = () => {
      if (AllTagData === null) return;
      if(SearchText === ''){
        setUIdata(oriUIdata);
        return;
      };
      const data = AllTagData.map((item,index) => {
        let tagName = item.tagName.toUpperCase();
        return tagName.indexOf(SearchText.toUpperCase()) !== -1 ? <Tag data={item} key={index} dataIndex={index} fnc={fnc} /> : null;
      })
      setUIdata(data);
    }
    //search after .5s beacuse efficient
    const timeoutID = setTimeout( () => { 
      search();
    }, 500);
    return () => {
        clearTimeout(timeoutID)
    }
  },[SearchText,oriUIdata])// eslint-disable-line react-hooks/exhaustive-deps
  return(
      <Wrapper>
        <SearchBox placeholder='搜尋標籤...' onChange={(e) => setSearchText(e.target.value)} />
        <H4>標籤</H4>
        {UIdata ? UIdata : ''}
        <Button ref={btnRef} onClick={CreateTag}>建立新標籤</Button>
      </Wrapper>
  )
}

export default SetTag;