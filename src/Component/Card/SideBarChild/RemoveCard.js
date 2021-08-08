import React, {useContext} from 'react';
import styled from "styled-components";
//context
import {AllCardContext} from '../../../Container';
//api
import db from '../../../API';
//icon
import CloseIcon from '@material-ui/icons/Close';

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
const Hr = styled.div`
  border-bottom: 1px solid #D5D9E0;
  margin: 0px 10px 0px 10px;
`
const Container = styled.div`
  padding: 10px
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
const Button = styled.button`
  background-color: #b04632;
  border-radius: 3px;
  border: none;
  color: #FFF;
  padding: 6px 12px 6px 12px;
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #933b27; 
  }
`
const RemoveCard = ({card, List_Obj, close, closeCard}) => {
  const {AllCardData, setAllCardData} = useContext(AllCardContext);
  const {ListID} = List_Obj;
  //刪除卡片
  const handleClick = () => {
    //刪除卡片 firebase
    let _AllCardData = JSON.parse(JSON.stringify(AllCardData));
    let _cards = _AllCardData.lists[ListID].cards.filter(item => item.id !== card.id);
    _AllCardData.lists[ListID].cards = _cards;
    db.collection('Lists').doc(ListID).update({
      cards: _cards
    });
    
    //刪除卡片描述 firebase
    db.collection('Card_Description').doc(card.id).delete();
    //刪除代辦清單 firebase
    db.collection('Card_ToDoList').doc(card.id).delete();

    setAllCardData(_AllCardData);
    close()                        //關閉對話框
    closeCard()                    //直接關閉卡片,不然會報錯
  }

  return(
    <Wrapper>
      <Header>
        <TitleText>刪除卡片?</TitleText>
        <Icon right='0' onClick={close}>
          <CloseIcon />
        </Icon>
      </Header>
      <Hr />
      <Container>
        所有動作都會自活動紀錄中移除，你將無法再次打開這張卡片。此動作不可復原。
        <Button onClick={handleClick}>刪除</Button>
      </Container>
    </Wrapper>
  )
};
export default RemoveCard;