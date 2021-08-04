import React, {useState, useRef, useContext} from 'react';
import styled from "styled-components";
//component
import SetTag from '../../Menu/SetTag';
import ModifyTag from '../../Menu/ModifyTag';
//context
import { AllCardContext } from '../../../Container';
import { TagContext } from '../../../Container';
//api
import db from '../../../API';
import { v4 as uuid } from "uuid";
//icon
import CloseIcon from '@material-ui/icons/Close';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
`
const TitleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  color: #5e6c84;
`
const Icon = styled.div`
  display: ${props => props.display ? props.display : 'flex'};
  position: absolute;
  left: ${props => props.left ? props.left : ''};
  right: ${props => props.right ? props.right : ''};
  justify-content: center;
  align-items: center; 
  width: 20px;
  height: 20px;
  padding: 10px 8px 10px 8px;
  color: #5e6c84;
  cursor: pointer;
`
const Hr = styled.div`
  border-bottom: 1px solid #D5D9E0;
  margin: 0px 10px 0px 10px;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px 10px 0px;
`
const SideBarTag = ({List_Obj, card, close}) => {
  const {AllCardData, setAllCardData} = useContext(AllCardContext);
  const {TagContext_Obj} = useContext(TagContext);
  const {AllTagData, setAllTagData} = TagContext_Obj;
  const {ListID} = List_Obj;
  const [HeaderTitle, setHeaderTitle] = useState([]);
  const [Modify, setModify] = useState(false);//是否修改標籤
  const [Create, setCreate] = useState(false);//是否新建標籤
  const [tagData, settagData] = useState(null);
  const childrenRef = useRef(null);
  //是否關閉刪除的提示視窗
  const CheckConfirm = () => childrenRef.current ? childrenRef.current.CheckConfirm() : null;
  //替卡片增加、移除標籤
  const handleClick = (event, client, tagData) => {
    const cards = AllCardData.lists[ListID].cards;
    const _card = cards.find(_card => _card.id === card.id);
    //卡片的標籤列表
    let card_tagIDs = _card.tagID ? [..._card.tagID] : [];
    let newCard = JSON.parse(JSON.stringify(_card));
    if(card_tagIDs.includes(tagData.tagID)){ //卡片的標籤包含點擊的標籤
      //如果卡片標籤已經包含click的標籤，刪除卡片標籤
      newCard.tagID.every((ID, index) => {
        if(ID === tagData.tagID){
          newCard.tagID.splice(index, 1);
          return false;
        }else{
          return true;
        }
      });
    };
    if(!card_tagIDs.includes(tagData.tagID)){//卡片的標籤不包含點擊的標籤
      if(!newCard.tagID) newCard.tagID = [];
      newCard.tagID.push(tagData.tagID);
    };
    //用新卡片替換舊卡片
    let tmpList = JSON.parse(JSON.stringify(AllCardData.lists[ListID]));
    const index = tmpList.cards.findIndex(item => item.id === newCard.id);
    tmpList.cards.splice(index, 1, newCard);
    //建立新的看板資料
    const newState = {
      listIds: [...AllCardData.listIds],
      lists: {
        ...AllCardData.lists,
        [ListID]: tmpList
      }
    };
    //更新畫面上的看板資料
    setAllCardData(newState);
    //更新firebase的看板資料
    db.collection('Lists').doc(ListID).update({
      "cards": tmpList.cards
    })
  }
  //編輯卡片
  const IconClick = (event, client, tagData) => {
    event.stopPropagation() 
    settagData(tagData)
    setModify(true)
    GoNext('改變標籤')
  }
  //改變標籤時click儲存
  const Submit = async (event, oriTagData, newTag) => {
    event.stopPropagation();
    const {Title, TagColor} = newTag;
    //沒有輸入資料
    if(Title === '' || TagColor === null) return;
    //沒有改變資料
    if(Title === oriTagData.tagName && TagColor === oriTagData.bgColor) return GoBack();
    let _AllTagData = AllTagData ? [...AllTagData] : [];
    //更新畫面資料
    _AllTagData.every(tag => {
      if(tag.tagID === oriTagData.tagID){
        tag.tagName = Title;
        tag.bgColor = TagColor;
        return false;
      };
      return true;
    });
    setAllTagData(_AllTagData);
    //更新firebase
    let docRef = await db.collection('Tag').doc(oriTagData.tagID);
    docRef.update({
      'tagName': Title,
      'bgColor': TagColor
    });
    GoBack();
    settagData(null)
  }
  //新建標籤時click新建
  const CreateSubmit = async (event, close, newTag) => {
    const {Title, TagColor} = newTag;
    if(Title === '' || TagColor === null) return;
    let _AllTagData = AllTagData ? [...AllTagData] : [];
    const newData = { 'tagName': Title, 'bgColor':TagColor, 'tagID': uuid() };
    _AllTagData.push(newData);
    setAllTagData(_AllTagData);
    //更新firebase
    let docRef = await db.collection('Tag').doc(newData.tagID);
    docRef.set({
      'tagName': Title,
      'bgColor': TagColor
    });
    GoBack()
  }
  //建立新標籤
  const CreateClick = (event) => {
    event.stopPropagation();
    setModify(true);
    GoNext('新增標籤');
    setCreate(true);
  }
  //回上一個元件
  const GoBack = () => {
    const _HeaderTitle = [...HeaderTitle];
    _HeaderTitle.pop();
    setHeaderTitle(_HeaderTitle);
    CheckConfirm()
    setModify(false)
    setCreate(false)
  }
  //去下一個元件
  const GoNext = (title) => {
    const _HeaderTitle = HeaderTitle.length === 0 ? [] : [...HeaderTitle];
    _HeaderTitle.push(title);
    setHeaderTitle(_HeaderTitle);
  };
  const cards = AllCardData.lists[ListID].cards;
  const _tagIds = cards.find(_card => _card.id === card.id).tagID;
  const propsObj = {
    'tagData': tagData,
    'AllTagData': AllTagData,
    'setAllTagData': setAllTagData,
    'Submit': Create ? CreateSubmit : Submit
  };
  return(
    <Wrapper>
      <Header>
        <Icon left='0' display={HeaderTitle.length === 0 ? 'none' : null} onClick={GoBack}>
          <NavigateBeforeOutlinedIcon />
        </Icon>
        <TitleText>{HeaderTitle.length === 0 ? '標籤' : HeaderTitle[HeaderTitle.length - 1]}</TitleText>
        <Icon right='0' onClick={close}>
          <CloseIcon />
        </Icon>
      </Header>
      <Hr />
      <Container>
        {Modify ? (
          <ModifyTag ref={childrenRef} GoNext={GoNext} propsObj={propsObj} close={GoBack} />
        ) : (
          <SetTag handleClick={handleClick} IconClick={IconClick} CreateClick={CreateClick} card_tagIDs={_tagIds} animat={false} />
        )}
      </Container>
    </Wrapper>
  )
}
export default SideBarTag;