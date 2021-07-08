import React,{ useContext } from 'react';
import styled from "styled-components";
//context
import {ModifyContext} from '../List/ModifyCard'
//icon
import AddIcon from '@material-ui/icons/Add';
const Wrapper = styled.div`
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-right: ${props => props.marginRight ? props.marginRight : null};
  display: flex;
  flex-direction: column;
`
const Span = styled.span`
  color: #5e6c84;
  font-size: 12px;
`
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row
`
const Button = styled.span`
  background-color: ${props => props.bgColor ? props.bgColor : null};
  color: #FFF;
  height: 32px;
  min-width: 40px;
  padding: 0px 12px 0px 12px;
  margin-right: 5px;
  border-radius: 3px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  &:hover{
    opacity: 0.8
  }
`
const TagContainer = ({Icon}) => {
  //paraObj內容
  //const { AllTagData, setAllTagData, AllCardData, setAllCardData, card } = paraObj;
  const { paraObj } = useContext(ModifyContext);
  const {TagContext_Obj, card} = paraObj;
  console.log('TagContext_Obj')
  console.log(TagContext_Obj)
  const {AllTagData} = TagContext_Obj;
  //const {AllTagData, card} = paraObj;
  //標籤陣列
  const BtnArray = AllTagData.map((item, index) => {
    let array = card.tagID;
    return array && array.includes(item.tagID) ? (
        <Button key={index} bgColor={item.bgColor}>{item.tagName}</Button>
    ) : null;
  })
  return(
    <Wrapper marginLeft='40px'>
      <Span>標籤</Span>
      <BtnContainer>
        {BtnArray}
        <Icon hover={true} backgroundColor='rgba(9, 30, 66, .04)'>
          <AddIcon />
        </Icon>
      </BtnContainer>
    </Wrapper>
  )
}
export default TagContainer;