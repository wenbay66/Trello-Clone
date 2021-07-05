import React from 'react';
import styled from "styled-components";
//component
import Header from '../Card/Header';
import Container from '../Card/Container';
//icon
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

const Wrapper = styled.div`
  background: #F4F5F7;
  width: 40%;
  min-height: calc(100vh - 90px);
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 45px;
  display: flex;
  flex-direction: column;
  padding: 12px;
`
const Icon = styled.div`
  width: 32px;
  display: ${props => props.display ? props.display : 'flex'};
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 3px;
  opacity: ${props => props.opacity ? props.opacity : null};
  cursor: ${props => props.cursor ? props.cursor : null};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : null};
  margin-top: ${props => props.marginTop ? props.marginTop : null};
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-right: ${props => props.marginRight ? props.marginRight : null};
  &:hover{
      cursor: ${props => props.hover ? 'pointer' : null};
      background-color: ${props => props.hover ? '#E2E4E9' : null};
  }
`
const Span = styled.span`
  color: #5e6c84;
  font-size: ${props => props.fontSize ? props.fontSize : '14px'};
  display: flex;
  margin-left: ${props => props.marginLeft ? props.marginLeft : null}
`
export const ModifyContext = React.createContext();
const ModifyCard = ({ close, parentRef, paraObj }) => {
  //paraObj內容
  //const { AllTagData, setAllTagData, AllCardData, setAllCardData, card, ListTitle } = paraObj;
  const { card, ListTitle } = paraObj;
  
  return(
    <ModifyContext.Provider value={{paraObj}}>
      <Wrapper>
        <Header Icon={Icon} close={close} />
        <Span marginLeft='40px'>
          <span style={{marginRight: '5px'}}>在「{ListTitle}」列表中</span>
          <VisibilityOutlinedIcon />
        </Span>
        <Container Icon={Icon} card={card} />
      </Wrapper>
    </ModifyContext.Provider>
  )
}
export default ModifyCard;