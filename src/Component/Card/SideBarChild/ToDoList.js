import React, {useState, useEffect, useContext} from 'react';
import styled from "styled-components";
//context
//import { ModifyContext } from '../../List/ModifyCard';
//api
import { v4 as uuid } from "uuid";
import db from '../../../API';
const Wrapper = styled.div`
  
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
const ToDoList = ({propsObj, close}) => {
  const {Span, CheckList, setCheckList, ModifyContextObj} = propsObj;
  const [Title, setTitle] = useState('');
  const {card} = ModifyContextObj;
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
      <Span>標題</Span>
      <Input type='text' value={Title} onChange={handleChange} />
      <Container justifyContent='flex-start' marginTop='24px'>
        <Button onClick={handleClick}>新增</Button>
      </Container>
    </Wrapper>
  )
  }
export default ToDoList;

