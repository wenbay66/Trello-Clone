import React, {useState, useContext} from 'react';
import styled from "styled-components";
//context
import {ToDoListContext} from '../Container';
//import { ModifyContext } from '../../List/ModifyCard';
//icon
import CloseIcon from '@material-ui/icons/Close';
//api
import { v4 as uuid } from "uuid";
import db from '../../../API';
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
const Span = styled.span`
  color: #5E6C84;
  font-size: 12px;
  font-weight: 500;
`
const Input = styled.input`
  width: 100%;
  border: 2px solid #dfe1e6;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 8px 12px 8px 12px;
  background-color: rgb(250, 251, 252);
  cursor: pointer;
  overflow-wrap: break-word;
  font-size: 14px;
  line-height: 20px;
  &:focus {
    background-color: #FFF;
    border: 2px solid #0079bf;
    &:hover {
      background-color: #FFF;
      cursor: auto;
    }
  }
  &:hover {
    background-color: ${props => props.Edit ? '#FFF' : '#EBECF0'};
  }
`
const Container = styled.div`
	width: ${props => props.width ? props.width : null};
	display: ${props => props.display ? props.display : 'flex'};
	flex-direction: ${props => props.direction ? props.direction : 'row'};
	align-items: ${props => props.alignItems ? props.alignItems : 'center'};
	justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
	margin-top: ${props => props.marginTop ? props.marginTop : null};
	flex-grow: ${props => props.flexGrow ? props.flexGrow : null};
	background-color: ${props => props.bgColor ? props.bgColor : null};
`;
const Hr = styled.div`
  border-bottom: 1px solid #D5D9E0;
  margin: 0px 10px 0px 10px;
`
const Container1 = styled.div`
  
  padding: 10px;
`
const Button = styled.button`
  background-color: ${props => props.bgColor ? props.bgColor : '#0079BF'};
  border-radius: 3px;
  border: none;
  color: #FFF;
  padding: 6px 24px 6px 24px;
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-right: ${props => props.marginRight ? props.marginRight : null};
  margin-top: ${props => props.marginTop ? props.marginTop : null};
  width: ${props => props.width ? props.width : null};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : '#156AA7'};
  }
`;
const ToDoList = ({card, close}) => {
  //const { CheckList, setCheckList, ModifyContextObj} = propsObj;
  const {ToDoListContext_Obj} = useContext(ToDoListContext);
  const {CheckList, setCheckList} = ToDoListContext_Obj;
  const [Title, setTitle] = useState('');
  const handleChange = event => {
    setTitle(event.target.value);
  }
  const handleClick = () => {
    if(Title === '') return;
    let newList = {id: uuid(), title: Title, ToDoList: []};
    let newState;
    //卡片沒有待辦清單
    if(CheckList === null) newState = [newList];
    //卡片有待辦清單
    if(CheckList !== null) newState = [...CheckList, newList];
    //更新UIdata
    setCheckList(newState);
    //更新firebase
    let docRef = db.collection('Card_ToDoList').doc(card.id);
    docRef.set({
      ListArray: newState
    });
    //關閉Panel
    close();
  }
  return(
    <Wrapper>
      <Header>
        <TitleText>新增代辦清單</TitleText>
        <Icon right='0' onClick={close}>
          <CloseIcon />
        </Icon>
      </Header>
      <Hr/>
      <Container1>
        <Span>標題</Span>
        <Input type='text' value={Title} onChange={handleChange} />
        <Container justifyContent='flex-start' marginTop='24px'>
          <Button onClick={handleClick}>新增</Button>
        </Container>
      </Container1>
    </Wrapper>
  )
}
export default ToDoList;

