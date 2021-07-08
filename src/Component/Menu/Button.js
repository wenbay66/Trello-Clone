import React,{useContext} from 'react';
import styled from "styled-components";
//component
import { GoNextContext } from './Menu';
const Wrapper = styled.div`
  cursor: pointer;
  padding: 6px;
  display:flex;
  &:hover{
    background-color: rgba(9,30,66,.08);
  };
  border-radius: 3px;
  color: rgb(23, 43, 77);
  font-size: 14px;
  font-weight: 600;
`
const Context = styled.span`
  padding: ${props => props.padding ? props.padding : ''};
  width: ${props => props.width ? props.width : ''};
  display: flex;
  flex-direction: column;
  justify-context: center;
  white-space:nowrap;
`
const SubItem = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: rgb(94, 108, 132) ;
`
export default function Button(props){
  //{Name, Obj} = propsObj; //propsObj內容物
  //Name => 要帶入Component參數的props name
  //Obj => 要帶入Component的參數，如果沒有就帶null
  const { Component, MainTitle, SubTitle, propsObj = null } = props;
  const GoNext = useContext(GoNextContext);
  const fnc = () => GoNext(Component, MainTitle, propsObj);
  return(
    <Wrapper onClick={fnc}>
      <Context padding='0px 12px 0px 6px' width='20px'>
        {props.children}
      </Context>
      <Context>
        {MainTitle}
        <br />
        <SubItem>{SubTitle}</SubItem>
      </Context>
    </Wrapper>
  )
}