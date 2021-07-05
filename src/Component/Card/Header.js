import React,{useRef, useState, useEffect, useContext} from 'react';
import styled from "styled-components";
//context
import {ModifyContext} from '../List/ModifyCard';
//icon
import SubtitlesOutlinedIcon from '@material-ui/icons/SubtitlesOutlined';
import CloseIcon from '@material-ui/icons/Close';
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 32px
`
const InputContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  color: #172b4d;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 20px;
  font-weight: 600;
`
const Input = styled.input`
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  outline-style: none;
  font-size: 20px;
  font-weight: 600;
  border: 2px solid #0079bf;
  border-radius: 3px;
  
  margin-left: -4px
` 
const InputText = styled.div`
  width: 100%;
  height: 100%;
  color: #172b4d;
  line-height: 32px;
  
`
const Header = ({Icon, close}) => {
  //paraObj內容
  //const { AllTagData, setAllTagData, AllCardData, setAllCardData, card } = paraObj;
  const inputRef = useRef();
  const { paraObj } = useContext(ModifyContext);
  const { card, ListID, UpdateCardContext } = paraObj;
  const [oriTitle, setoriTitle] = useState(card.context);// eslint-disable-line no-unused-vars
  const [Title, setTitle] = useState(card.context);
  const [isEditTitle, setisEditTitle] = useState(false);
  const handleBlur = () => {
    setisEditTitle(false);
    //判斷有沒有改Title，有改再繼續往下跑
    if(oriTitle === Title) return;
    UpdateCardContext(Title, ListID, card);
  }
  //卡片標題進入編輯模式
  const handleClick = () => {
    setisEditTitle(true);
  }
  const handleChange = event => {
    setTitle(event.target.value);
  };
  useEffect(() => {
    return inputRef.current ? inputRef.current.focus() : "";
  }, [isEditTitle]);
  return(
    <Wrapper>
      <Icon marginRight='8px'>
        <SubtitlesOutlinedIcon />
      </Icon>
      <InputContainer>
        {isEditTitle ? (
          <Input ref={inputRef} value={Title} onBlur={handleBlur} onChange={handleChange} />
        ) : (
          <InputText onClick={handleClick}>{Title}</InputText>
        )}
      </InputContainer>
      <Icon marginLeft='3px' hover={true} onClick={close}>
        <CloseIcon />
      </Icon>
    </Wrapper>
  )
}
export default Header;