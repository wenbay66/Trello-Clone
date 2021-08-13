import React, { useState, useContext } from "react";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
//css
import "../../Css/reset.css";
import "../../Css/styles.css";
//component
import List from "./List";
import InputContainer from "./InputContainer";
import CardPanel1 from '../../CardPanel1';
//context
import { AllCardContext } from "../../Container";
//api
import db from '../../../src/API';

const Container = styled.div`
  display: flex;
  height: 30px;
`
const Container1 = styled.div`
  bachground-color: red;
  height: calc(100% - 48px);
  overflow-x: auto;
  min-height: 30px !important;
`
export const CardContext = React.createContext();
const Wrapper = function Wrapper() {
  const {AllCardData, setAllCardData} = useContext(AllCardContext);
  const [CardPanelData, setCardPanelData] = useState(null);
  const [Show, setShow] = useState(false);
  const [BgProps, setBgProps] = useState({});
  const counter1 = () => {
    let privateCounter = 0;
    const changeBy = (val) => {
      privateCounter += val;
    }
    return {
      increment: () => {
        changeBy(1);
      },
      decrement: () => {
        changeBy(-1);
      },
      value: () => {
        return privateCounter;
      }
    };
  }
  const counter = counter1()
  console.log('---------')
  console.log('log = ', counter.value()); // logs 0
  counter.increment();
  counter.increment();
  console.log('log = ', counter.value()); // logs 2
  //counter.decrement();
  //console.log('log = ', counter.value()); // logs 1

  //拖曳結束時
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    setBgProps({});
    
    //清除拖曳卡片時的背景
    let element = document.getElementById('bgCard');
    if(element) element.remove();

    if (!destination) return;

    //變更看板順序
    if (type === "List") {
      //利用淺拷貝問題
      const NewListIds = AllCardData.listIds;
      NewListIds.splice(source.index, 1);
      NewListIds.splice(destination.index, 0, draggableId);
      setAllCardData({
        ...AllCardData, 
        listIds:NewListIds
      });
      return;
    }
    let _AllCardData = JSON.parse(JSON.stringify(AllCardData))
    //拖曳開始的看板、起始的位置
    const SourceList = _AllCardData.lists[source.droppableId];
    //拖曳結束時的看板、放下的位置
    const DestinationList = _AllCardData.lists[destination.droppableId];
    //被拖曳的卡片
    const draggingCard = SourceList.cards.filter((card) => {
      return card.id === draggableId;
    })[0];
    //卡片在同一個看板間移動
    if (source.droppableId === destination.droppableId) {
      //刪除拖曳的卡片
      SourceList.cards.splice(source.index, 1);
      SourceList.cards.splice(destination.index, 0, draggingCard);
      setAllCardData(_AllCardData)
    }
    //卡片移動至另一個看板
    if (source.droppableId !== destination.droppableId) {
      //SourceList.cards.splice(source.index, 1);
      let newSourceCards = JSON.parse(JSON.stringify(SourceList.cards)).filter(card => card.id !== draggingCard.id);
      SourceList.cards = newSourceCards;
      DestinationList.cards.splice(destination.index, 0, draggingCard);
      setAllCardData(_AllCardData)
      //更新至firebase
      let sourceRef = db.collection('Lists').doc(source.droppableId);
      let destinationRef = db.collection('Lists').doc(destination.droppableId);
      sourceRef.update({
        cards: SourceList.cards
      });
      destinationRef.update({
        cards: DestinationList.cards
      })
    }
  };
  const OpenCard = (card, List_Obj) => {
    setShow(true);
    setCardPanelData({card, List_Obj});
  }
  const ListData = AllCardData ? AllCardData.listIds.map((listId, index) => {
    const list = AllCardData.lists[listId];
    return <List BgProps={BgProps} list={list} key={listId} index={index} />;
  }) : ('');
  const CardContext_Obj = {
    'OpenCard': OpenCard,    //開啟卡片
    'setShow': setShow,      //控制是否顯示CardPanel.js
  };
  const ListLayer = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="app" type="List" direction="horizontal">
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ListData}
            <InputContainer type="List" />
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
  return (
    <CardContext.Provider value={{...CardContext_Obj}}>
      <Container1>
        {ListLayer}
        {Show ? <CardPanel1 setShow={setShow} CardPanelData={CardPanelData} setCardPanelData={setCardPanelData} /> : null}
      </Container1>
    </CardContext.Provider>
  );
}
export default Wrapper;