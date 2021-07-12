import React,{useState, useEffect, useRef} from 'react';
import styled,{keyframes} from "styled-components";
//component
import Panel from '../../Panel';
import Tag from './Tag';
import ModifyTag from './ModifyTag';
//api
import { v4 as uuid } from "uuid";
import db from '../../API';
//import db from '../../../API';
const animat = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0%;
  }
`;
//Wrapper 預設有動畫，如果不要動畫需傳參數animat=false
const Wrapper = styled.div`
  dislay: flex;
  flex-direction: column;
  padding: 0px 8px 0px 8px;
  width: 100%;
  position:relative;
  animation: ${props => props.animat===false ? '' : animat} .1s ease-in;
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
const SetTag = ({TagContext_Obj, handleClick, IconClick, card_tagIDs, animat}) => {
  const [UIdata, setUIdata] = useState(null);
  const [SearchText, setSearchText] = useState('');
  const {AllTagData, setAllTagData} = TagContext_Obj;
  const [CurrentTagData, setCurrentTagData] = useState(AllTagData);
  const btnRef = useRef();
  //建立全新標籤
  const CreateTag = (event) => {
    const client = btnRef.current.getBoundingClientRect();
    //top、left、width、tagName
    const Top = `${client.y + client.height + 2}px`; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
    const Left = `${client.x}px`;                    //加上半個 icon 的寬度比較好看
    const width = `${client.width}px`;               //需扣掉半個 icon 寬度
    //click 新建
    const Submit = async (oriTagData, newTag) => {
      const {Title, TagColor} = newTag;
      if(Title === '' || TagColor === null) return;
      let _CurrentTagData = CurrentTagData ? [...CurrentTagData] : [];
      const newData = { 'tagName': Title, 'bgColor':TagColor, 'tagID': uuid() };
      _CurrentTagData.push(newData);
      setAllTagData(_CurrentTagData);
      setCurrentTagData(_CurrentTagData);
      //更新firebase
      let docRef = await db.collection('Tag').doc(newData.tagID);
      docRef.set({
        'tagName': Title,
        'bgColor': TagColor
      });
      Panel.close();
    };
    const propsObj = { //有參數統一塞進這裡
      'AllTagData': AllTagData,
      'setAllTagData': setAllTagData,
      'CurrentTagData': CurrentTagData,
      'setCurrentTagData': setCurrentTagData,
      'Submit': Submit
    };
    Panel.open({Top, Left, width, propsObj, component: ModifyTag, Title: '新增標籤'})
  }
  //修改標籤
  const EditTag = (client, tagData) => {
    //top、left、width、tagName
    const Top = `${client.y + client.height + 2}px`; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
    const Left = `${client.x + 16}px`;               //加上半個 icon 的寬度比較好看
    const width = `${client.width - 16}px`;          //需扣掉半個 icon 寬度
    //click 儲存
    const Submit = async (oriTagData, newTag) => {
      const {Title, TagColor} = newTag;
      if(Title === '' || TagColor === null) return;
      //沒有修改(直接結束)
      if(oriTagData.tagName === Title && oriTagData.bgColor === TagColor){
        Panel.close();
        return;
      };
      let _CurrentTagData = CurrentTagData ? [...CurrentTagData] : [];
      //更新畫面資料
      _CurrentTagData.every(tag => {
        if(tag.tagID === oriTagData.tagID){
          tag.tagName = Title;
          tag.bgColor = TagColor;
          return false;
        };
        return true;
      });
      setAllTagData(_CurrentTagData);
      setCurrentTagData(_CurrentTagData);
      //更新firebase
      let docRef = await db.collection('Tag').doc(oriTagData.tagID);
      docRef.update({
        'tagName': Title,
        'bgColor': TagColor
      });
      Panel.close();
    }
    const propsObj = {
      'tagData': tagData,
      'AllTagData': AllTagData,
      'setAllTagData': setAllTagData,
      'CurrentTagData': CurrentTagData,
      'setCurrentTagData': setCurrentTagData,
      'Submit': Submit
    };
    Panel.open({Top, Left, width, propsObj, component: ModifyTag, Title: '修改標籤'})
  }
  //計算畫面資料
  useEffect(() => {
    if (CurrentTagData === null) return;
    setUIdata(getUIdata());
  },[CurrentTagData])// eslint-disable-line react-hooks/exhaustive-deps
  //根據SearchText改變畫面資料
  useEffect(() => {
    const search = () => {
      if (CurrentTagData === null) return;
      setUIdata(getUIdata());
    }
    //search after .5s beacuse efficient
    const timeoutID = setTimeout( () => { 
      search();
    }, 500);
    return () => {
      clearTimeout(timeoutID)
    }
  },[SearchText])// eslint-disable-line react-hooks/exhaustive-deps
  //計算畫面資料
  const getUIdata = () => {
    return CurrentTagData
    .filter(tagData => {  //如果有輸入搜尋文字,畫面資料須包含搜尋文字
      let tagName = tagData.tagName.toUpperCase();
      return SearchText === '' ? (tagData) : (tagName.indexOf(SearchText.toUpperCase()) !== -1);
    })
    .map((tagData, index) => {  //根據filter結果渲染畫面資料
      return (
        <Tag 
          key={index} 
          data={tagData} 
          //由CardPanel傳進來
          checked={card_tagIDs ? card_tagIDs.includes(tagData.tagID) : null}
          handleClick={handleClick ? handleClick : EditTag} 
          IconClick={IconClick ? IconClick : EditTag} 
        />
      )
    });
  }
  return(
    <Wrapper animat={animat}>
      <SearchBox placeholder='搜尋標籤...' onChange={e => setSearchText(e.target.value)} />
      <H4>標籤</H4>
      {UIdata ? UIdata : ''}
      <Button ref={btnRef} onClick={CreateTag}>建立新標籤</Button>
    </Wrapper>
  )
}
export default SetTag;