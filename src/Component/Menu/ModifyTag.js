import React,{useState, useContext, useImperativeHandle} from 'react';
import styled from "styled-components";
//component
import TagBox from './TagBox';
//context
import {AllCardContext} from '../../Container';
//api
import db from '../../API';
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
  margin: ${props => props.margin ? props.margin : null};
  width: ${props => props.width ? props.width : null};
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
const ModifyTag = ({ GoNext, close, propsObj}, ref) => {
  const {tagData, AllTagData, setAllTagData, Submit } = propsObj ? propsObj : null;
  //tagData提供三個 value => tagName, bgColor, tagID
  const [Title, setTitle] = useState(tagData ? tagData.tagName : '');        //標籤名稱
  const [TagColor, setTagColor] = useState(tagData ? tagData.bgColor : null) //標籤顏色
  const [Confirm, setConfirm] = useState(false);
  const {AllCardData, setAllCardData} = useContext(AllCardContext);
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
  //是否關閉刪除的提示視窗
  useImperativeHandle(ref, () => ({
    CheckConfirm: () => {
      if(Confirm === true){
        setConfirm(false)
      }
    }
  }))
  //刪除卡片標籤資料
  const DeleteCardTag = () => {
    const _AllCardData = JSON.parse(JSON.stringify(AllCardData));
    let tmplistIds = [];
    const Callback = (cards, listId) => {
      cards.every(card => {
        if(card.tagID && card.tagID.includes(tagData.tagID)){
          const tagIndex = card.tagID.findIndex(id => id === tagData.tagID);
          card.tagID.splice(tagIndex, 1);
          tmplistIds.push(listId);
        }
        return true;
      })
    };
    //畫面資料刪除
    _AllCardData.listIds.forEach(listId => Callback(_AllCardData.lists[listId].cards, listId));
    setAllCardData(_AllCardData);
    //call firebase api 刪除
    const apiCallback = async listId => {
      let docRef = await db.collection('Lists').doc(listId);
      let _cards = [..._AllCardData.lists[listId].cards];
      docRef.update({
        cards: _cards
      });
    }
    tmplistIds.forEach(listId => apiCallback(listId));
  }
  //刪除標籤資料
  const DeleteTag = async () => {
    let _AllTagData = [...AllTagData];
    //取得外層Context傳入的標籤資料
    const oriTagData = AllTagData.find(item => item.tagID === tagData.tagID);
    //找出要刪除的標籤index
    const index = AllTagData.findIndex(item => oriTagData.tagID === item.tagID);
    _AllTagData.splice(index, 1);
    //更新標籤資料Context
    setAllTagData(_AllTagData);
    //call api 更新遠端數據庫
    let docRef = db.collection('Tag').doc(tagData.tagID);
    docRef.delete()
  }
  //刪除標籤
  const Delete = () => {
    DeleteCardTag();  //刪除卡片標籤
    DeleteTag();      //刪除標籤
    //關閉對話框
    close();
  }
  const openConfirm = event => {
    GoNext('刪除標籤?');
    setConfirm(true);
    event.stopPropagation();
  }
  const Layer = (
    <>
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
          onClick={tagData ? (
            (e) => Submit(e, tagData, {Title, TagColor})
          ) : (
            (e) => Submit(e, close, {Title, TagColor})
          )} 
        >
          {propsObj.tagData ? '儲存' : '新建'}
        </Button>  
        <Button bgColor="#b04632" hoverColor='#933B28' Hidden={tagData ? false : true} onClick={openConfirm}>
          刪除
        </Button>
      </Footer>
    </>
  );
  const ConfirmLayer = (
    <>
      <p>此動作無法復原。將移除所有卡片上的這個標籤，同時銷毀它的歷程</p>
      <Button
        margin='4px 0px 0px 0px'
        bgColor="#b04632" 
        hoverColor='#933B28'
        width='100%'
        onClick={Delete}
      >
        刪除
      </Button>
    </>
  );
  return(
    <div style={{padding: '8px'}}>
      {Confirm ? ConfirmLayer : Layer}
    </div>
  )
}
export default React.forwardRef(ModifyTag);