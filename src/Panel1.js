import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
const Wrapper = styled.div`
  z-index: 99;
  position: fixed;
  top: ${props => props.Top ? props.Top : '0px'};
  left: ${props => props.Left ? props.Left : '0px'};
  width: ${props => props.width ? props.width : '0px'};
  background-color: #FFF;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  
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
      {children}
    </Wrapper>
  )
}
export const Panel1TitleContext = React.createContext();
export default Panel1;