import React, {useContext} from 'react';
import styled from "styled-components";
//context
import { ToDoListContext } from '../Container';
import {AllCardContext} from '../../../Container';
//api
import db from '../../../API';
import { v4 as uuid } from "uuid";
//icon
import CloseIcon from '@material-ui/icons/Close';

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
const Button = styled.button`
  background-color: ${props => props.bgColor ? props.bgColor : '#0079BF'};
  border-radius: 3px;
  border: none;
  color: #FFF;
  padding: 6px 12px 6px 12px;
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-right: ${props => props.marginRight ? props.marginRight : null};
  margin-top: ${props => props.marginTop ? props.marginTop : null};
  width: ${props => props.width ? props.width : null};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : '#156AA7'};
  }
`
const CheckListItem = ({propsObj, close}) => {
  const { Listid, ToDo, card, List_Obj } = propsObj;
  const {ListID} = List_Obj;
  const {ToDoListContext_Obj} = useContext(ToDoListContext);        //卡片的代辦清單
	const {CheckList, setCheckList} = ToDoListContext_Obj;
  const { AllCardData, setAllCardData } = useContext(AllCardContext);  //卡片列表資料
  const btnProps = {width: '100%', marginTop: '15px', color: '#FFF'};
  const handleClick = (fnc) => {
    fnc();
    close();
  };
  //刪除待辦細項
  const deleteToDo = () => {
    let _List = JSON.parse(JSON.stringify(CheckList.find(List => List.id === Listid)));
    const ListIndex = CheckList.findIndex(List => List.id === Listid);
    const newToDoList = _List.ToDoList.filter(todo => todo.id !== ToDo.id);
    let newState = JSON.parse(JSON.stringify(CheckList));
    _List.ToDoList = newToDoList;
    newState[ListIndex] = _List;
    //更新 context
    setCheckList(newState);
    //更新 firebase
    let docRef = db.collection('Card_ToDoList').doc(card.id);
    docRef.set({
      ListArray: newState
    });
    console.log('delete success')
  }
  //待辦細項轉成卡片
  const transToCard = () => {
    const _list = AllCardData.lists[ListID];
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      context: ToDo.context
    };
    _list.cards = _list.cards ? [..._list.cards, newCard] : [newCard];
    const newState = {
      ...AllCardData,
      lists: {
        ...AllCardData.lists,
        [ListID]: _list
      }
    };
    //更新context
    setAllCardData(newState);
    //更新 firebase
    let docRef = db.collection('Lists').doc(ListID);
    docRef.update({
      cards: _list.cards
    });
    deleteToDo();
  }
  return(
    <div>
      <Header>
        <TitleText>項目動作</TitleText>
        <Icon right='0' onClick={close}>
          <CloseIcon />
        </Icon>
      </Header>
      <Hr />
      <div style={{padding: '0px 10px 10px 10px'}}>
        <Button {...btnProps} onClick={() => handleClick(transToCard)}>轉換為卡片</Button>
			  <Button onClick={() => handleClick(deleteToDo)} bgColor='#b04632' hoverColor='#933b27' {...btnProps}>刪除</Button>
      </div>
    </div>
  )
};
export default CheckListItem;