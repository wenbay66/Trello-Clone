import React, {useRef} from 'react';
import styled from "styled-components";
//component
import ModifyCard from './Component/List/ModifyCard';

const Wrapper = styled.div`
  z-index: 90;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: absolute;
  top: ${props => props.Top ? props.Top : '0px'};
  left: ${props => props.Left ? props.Left : '0px'};
  background: rgba(0, 0, 0, 0.5);
`
const CardPanel1 = ({setShow, CardPanelData, setCardPanelData}) => {
  const { card, List_Obj } = CardPanelData;
  const Ref = useRef();
  const close = () => {
    setShow(false);
  }
  return(
    <Wrapper ref={Ref}>
      <ModifyCard card={card} List_Obj={List_Obj} close={close} />
    </Wrapper>
  )
}
export default CardPanel1;
