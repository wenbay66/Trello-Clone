import React,{useState, useEffect} from 'react';
import { v4 as uuid } from "uuid";
import styled from "styled-components";
//component
import TagBox from './TagBox';

const H4 = styled.h4`
  font-size: 12px;
  font-weight: 700;
  color: #5E6C84;
  margin-bottom: 4px;
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
const Container = styled.div`
  display: flex;
  justify-content: flex-start; 
  flex-wrap: wrap;
  padding-bottom: 10px;
  margin-left: -5px;
`
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Button = styled.button`
  background-color: ${props => props.bgColor ? props.bgColor : null};
  color: #FFF;
  font-size: 14px;
  font-weight: 400;
  height: 32px;
  display: ${props => props.Hidden ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  padding: 3px 18px 3px 18px;
  outline: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.hoverColor ? props.hoverColor : null};
  }
`
const ModifyTag = ({close, parentRef, propsObj}) => {
  const {tagData, AllTagData, setAllTagData} = propsObj ? propsObj : null;
  //AllTagData、setAllTagData => Tag.js傳進來的參數(Context資料)。
  //tagData提供三個 value => tagName, bgColor, tagID
  const [Title, setTitle] = useState(tagData ? tagData.tagName : '');        //標籤名稱
  const [TagColor, setTagColor] = useState(tagData ? tagData.bgColor : null) //標籤顏色
  //選定Tag要什麼顏色的
  const bgColor = ['#61BD50','#F2D600','#FB9F1A','#EB5A46','#C377E0','#1A79BF','#00C2E0','#51E898','#FF78CB','#344563'];
  const boxData = bgColor.map((item, index) => {
    return (
      <TagBox   
        key={index}
        bgColor={item}
        isShow={TagColor === item ? true : false} //要不要顯示勾勾
        setTagColor={setTagColor}
      />
    )
  });
  const Submit = () => {
    //先卡控有沒有輸入標籤資料
    if(Title === '' || TagColor === null) return;
    let _AllTagData = AllTagData ? [...AllTagData] : [];
    //新增標籤
    if(!tagData){ //tagData為空代表要建立新標籤
      const newData = { 'tagName': Title, 'bgColor':TagColor, 'tagID': uuid() };
      _AllTagData.push(newData);
      setAllTagData(_AllTagData);
      //call api 更新數據庫
      close();
      return;
    }
    //修改標籤
    if(tagData){
      //取得外層Context傳入的標籤資料(用來檢查有沒有修改)
      const oriTagData = AllTagData.find(item => item.tagID === tagData.tagID);
      //沒有修改(不call api 更新資料)
      if(oriTagData.tagName === Title && oriTagData.bgColor === TagColor){
        close();
        return;
      }
      //有修改標籤資訊(call api 更新資料)
      if(oriTagData.tagName !== Title || oriTagData.bgColor !== TagColor){
        //找出目前編輯的標籤是哪一個(用ID去找)
        const index = AllTagData.findIndex(item => tagData.tagID === item.tagID);
        _AllTagData[index].tagName = Title;
        _AllTagData[index].bgColor = TagColor;
        setAllTagData(_AllTagData);
        //call api 更新遠端數據庫

        close();
      }
    }
  }
  //刪除標籤
  const Delete = () => {
    let _AllTagData = [...AllTagData];
    //取得外層Context傳入的標籤資料
    const oriTagData = AllTagData.find(item => item.tagID === tagData.tagID);
    //找出要刪除的標籤index
    const index = AllTagData.findIndex(item => oriTagData.tagID === item.tagID);
    _AllTagData.splice(index, 1);
    //修改卡片資料，刪除被刪除的 Tag 的 tagID

    //call api 更新遠端數據庫

    //更新標籤資料Context
    setAllTagData(_AllTagData);

    //更新卡片資料Context

    //關閉對話框
    close();
  }
  //點擊其他地方可以關閉 Panel
  useEffect(() => {
    const onBodyClick = event => {
      //react v17 必須增加判斷 ref.current
      if(parentRef.current && !parentRef.current.contains(event.target)){
          close();
      }
    }
    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click',onBodyClick);
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  return(
    <div >
      <H4>名字</H4> 
      <SearchBox onChange={(e) => setTitle(e.target.value)} value={Title} />
      <H4>選一個顏色</H4> 
      <Container>
        {boxData}
      </Container>
      <Footer>
        <Button 
          bgColor='#1A79BF'
          hoverColor='#156AA7' 
          onClick={Submit}
        >
        {propsObj.tagData ? '儲存' : '新建'}
        </Button>  
        <Button   
          bgColor="#b04632" 
          hoverColor='#933B28'
          onClick={Delete}
          Hidden={tagData ? false : true}
        >
        刪除
        </Button>
      </Footer>
    </div>
  )
}
export default ModifyTag;