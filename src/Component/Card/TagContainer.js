import React,{ useState, useRef, useEffect, useContext } from 'react';
import styled from "styled-components";
//component
import Panel1 from '../../Panel1';
import {TagContext} from '../../Container';
import {AllCardContext} from '../../Container';
//component
import SideBarTag from './SideBarChild/SidebarTag';
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
const TagContainer = ({card, List_Obj, Icon}) => {
  const {TagContext_Obj} = useContext(TagContext);
  const {AllTagData} = TagContext_Obj;
  const {AllCardData} = useContext(AllCardContext)
  const {ListID} = List_Obj;
  const [BtnArray, setBtnArray] = useState(null);
  const [Position, setPosition] = useState(null);
  const [isShow, setisShow] = useState(false);
  const Ref = useRef();
  //標籤陣列
  useEffect(() => {
    const cards = AllCardData.lists[ListID].cards;
    const _card = cards.find(_card => _card.id === card.id);
    const tagIds = _card.tagID;
    if(_card.tagID && _card.tagID.length > 0){
      setisShow(true)
    }else{
      setisShow(false)
    }
    if(!tagIds) return;
    const _BtnArray = AllTagData.map((item, index) => {
      return tagIds.includes(item.tagID) ? (
        <Button 
          key={index} 
          bgColor={item.bgColor}
          onClick={() => openSideBarTag(Ref.current.getBoundingClientRect())}
        >
          {item.tagName}
        </Button>
      ) : null;
    })
    setBtnArray(_BtnArray)
  },[AllCardData, AllTagData]);// eslint-disable-line react-hooks/exhaustive-deps
  //ref={Ref} onClick={() => fnc(Ref.current.getBoundingClientRect(), name, ComponentName)
  const close = () => setPosition(null);
  //開啟彈出層
  const openSideBarTag = (client) => {
    //top、left、width、tagName
    const Top = `${client.y + client.height + 5}px`; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
    const Left = `${client.x}px`;   
    const width = '330px';         
    setPosition({
      'Top': Top,
      'Left': Left,
      'width': width
    })
  }
  return(
    <>
      {isShow ? (
        <Wrapper marginLeft='40px'>
          <Span>標籤</Span>
          <BtnContainer ref={Ref}>
            {BtnArray}
            <Icon hover={true} backgroundColor='rgba(9, 30, 66, .04)' onClick={() => openSideBarTag(Ref.current.getBoundingClientRect())}>
              <AddIcon />
            </Icon>
          </BtnContainer>
          {Position ? (
            <Panel1 Top={Position.Top} Left={Position.Left} width={Position.width} close={close}>
              <SideBarTag card={card} List_Obj={List_Obj} close={close} />
            </Panel1>
          ) : (null)}
        </Wrapper>
      ) : null}
    </>
  )
}
export default TagContainer;