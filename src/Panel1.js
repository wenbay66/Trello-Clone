import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
//icon
import CloseIcon from '@material-ui/icons/Close';
const Wrapper = styled.div`
  position: absolute;
  top: ${props => props.Top ? props.Top : '0px'};
  left: ${props => props.Left ? props.Left : '0px'};
  width: ${props => props.width ? props.width : '0px'};
  background-color: #FFF;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
`
const Container = styled.div`
  padding: 8px
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
  position: absolute;
  right: 0;
  display: flex;
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
const Panel1 = ({Top, Left, width, Title, close, children}) => {
  const Ref = useRef();
  useEffect(() => {
    const onBodyClick = event => {
      //react v17 必須增加判斷 ref.current
      if(Ref.current && !Ref.current.contains(event.target)){
          close();
      }
    }
    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click',onBodyClick);
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  return(
    <Wrapper ref={Ref} Top={Top} Left={Left} width={width}>
      <Header>
        <TitleText>{Title}</TitleText>
        <Icon onClick={close}>
          <CloseIcon />
        </Icon>
      </Header>
      <Hr />
      <Container>
        {children}
      </Container>
    </Wrapper>
  )
}
export default Panel1;