import React, {useState} from 'react';
import styled from "styled-components";
import Panel from '../../../Panel';
//component
import SetTag from '../../Menu/SetTag';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center
`
const Tag = ({propsObj}) => {
  const {ModifyContextObj} = propsObj;
  const {TagContext_Obj, CardContext_Obj, List_Obj, card} = ModifyContextObj;
  const {AllCardData, setAllCardData} = CardContext_Obj;
  const {ListID} = List_Obj;
  //替卡片增加、移除標籤
  const handleClick = (client, tagData) => {
    //console.log(ModifyContextObj)
    //卡片的標籤列表
    let card_tagIDs = card.tagID ? [...card.tagID] : [];
    //let newAllCardData = JSON.parse(JSON.stringify(AllCardData));
    //let tmpList = JSON.parse(JSON.stringify(AllCardData.lists[ListID]));
    let newCard = JSON.parse(JSON.stringify(card));
    if(card_tagIDs.includes(tagData.tagID)){ //卡片的標籤包含點擊的標籤
      //console.log(tmpCurrentList)
      newCard.tagID.every((ID, index) => {
        if(ID === tagData.tagID){
          newCard.tagID.splice(index, 1);
          return false;
        }else{
          return true;
        }
      });
    };
    if(!card_tagIDs.includes(tagData.tagID)){
      newCard.tagID.push(tagData.tagID);
    };
    //console.log(newCard)
    //用新卡片替換舊卡片
    let tmpList = JSON.parse(JSON.stringify(AllCardData.lists[ListID]));
    const index = tmpList.cards.findIndex(card => card.id === newCard.id);
    tmpList.cards.splice(index, 1, newCard);
    //建立新的看板資料
    const newState = {
      listIds: [...AllCardData.listIds],
      lists: {
        ...AllCardData.lists,
        [ListID]: tmpList
      }
    };
    //更新畫面上的看板資料
    setAllCardData(newState);
    //更新firebase的看板資料

    //更新畫面上的
    Panel.close()
  }
  const IconClick = (client, tagData) => {
    alert('icon')
  }
  return(
    <Wrapper>
      <SetTag 
        TagContext_Obj={TagContext_Obj} 
        handleClick={handleClick} 
        IconClick={IconClick} 
        card_tagIDs={card.tagID}
        animat={false} 
      />


    </Wrapper>
  )
}
export default Tag;