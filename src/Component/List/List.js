import React,{ useContext } from "react";
//component
import Title from "./Title";
import Card from "./Card";
import InputContainer from "./InputContainer";
//context
import {AllCardContext} from '../../Container';
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function List({ list, BgProps, index }) {
  const { searchTag, searchText } = useContext(AllCardContext);
  //檢查卡片有沒有包含要搜尋的標籤
  const getHasTag = card => {
    if(searchTag.length > 0 && card.tagID){
      //const tmplist = card.tagID.filter(id => searchTag.includes(id));
      const tmplist = searchTag.filter(tag => card.tagID.includes(tag));
      return tmplist.length === searchTag.length
    }
    if(searchTag.length > 0 && !card.tagID) return false
    return true;
  };
  //檢查卡片有沒有包含要搜尋的文字
  const getHasText = card => {
    if(searchText !== ''){
      return (card.context).includes(searchText)
    }
    return true;
  };
  const CardData = list.cards ? list.cards
  .filter(card => {
    //沒有搜尋項目
    if(searchTag.length === 0 && searchText === '') return true;
    //有沒有包含要搜尋的標籤
    let hasTag = getHasTag(card);
    //有包含文字
    let hasText = getHasText(card);
    return hasTag && hasText
  })
   : null;
  const root = {
    width: "300px",
    backgroundColor: "#EBECF0",
    marginLeft: '8px',
    marginTop: '8px',
    paddingBottom: '8px',
    borderRadius: '3px',
    
  }
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div style={root} {...provided.dragHandleProps}>
            <Title listId={list.id} title={list.title} />
            <Droppable droppableId={list.id} type='card'>
              {(provided, snapshot) => (
                <div style={{width: 'inherit', minHeight: '30px', position: 'relative'}} ref={provided.innerRef} {...provided.droppableProps}>
                  {CardData ? CardData.map((card, index) => {
                    return (
                      <Card
                        key={card.id} 
                        List_Obj={{'ListTitle': list.title, 'ListID': list.id}}
                        card={card} 
                        index={index}
                      />
                    );
                  }) : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
            <InputContainer type="Card" listId={list.id} />
          </div>
        </div>
      )}
    </Draggable>
  );
}