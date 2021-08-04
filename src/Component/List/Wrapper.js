import React, { useState, useEffect, useContext } from "react";
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
  
  //卡片資料測試環境(init render)
  useEffect(() => {
    const cards = [
      {
        id: "card-1",
        context: "Learn react hook",
        firebaseID: '123'
      },
      {
        id: "card-2",
        context: "making product",
        tagID: ['tag-4'],
        firebaseID: '123'
      },
      {
        id: "card-3",
        context: "Takeing you out",
        firebaseID: '123'
      }
    ];
    const data = {
      lists: {
        "list-1": {
          id: "list-1",
          title: "TODO",
          cards
        },
        "list-2": {
          id: "list-2",//取得firebase doc.id
          title: "DOING",
          cards: [
            {
              id: "card-4",//uuid給
              context: "基本Node.js觀念",
              tagID: ["tag-1", 'tag-2'],
              firebaseID: '0VkprlbzJmjGlxlWABmD'
            },
            {
              id: "card-5",
              context: "用Node.js開簡單API",
              tagID: ["tag-3"],
              firebaseID: '123'
            },
            {
              id: "card-6",
              context: "test6",
              tagID: ["tag-2"],
              firebaseID: '123'
            },
            {
              id: "card-7",
              context: "test7",
              tagID: ["tag-1"],
              firebaseID: '123'
            },
            {
              id: "card-8",
              context: "test8",
              tagID: ["tag-3",'tag-4'],
              firebaseID: '123'
            },
            {
              id: "card-9",
              context: "test9",
              tagID: ["tag-5",'tag-6'],
              firebaseID: '123'
            },
            {
              id: "card-10",
              context: "test10",
              tagID: ["tag-2"],
              firebaseID: '123'
            },{
              id: "card-11",
              context: "test11",
              tagID: ["tag-2"],
              firebaseID: '123'
            }
          ]
        }
      },
      listIds: ["list-1", "list-2"]//firebase uuid
    };
    //setAllCardData(data)
  },[]);
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
      console.log(NewListIds)
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
      /*const NewState = {
        ..._AllCardData,
        lists: {
          ..._AllCardData.lists,
          [SourceList.id]: SourceList
        }
      };
      setAllCardData(NewState);*/
      setAllCardData(_AllCardData)
    }
    //卡片移動至另一個看板
    if (source.droppableId !== destination.droppableId) {
      //SourceList.cards.splice(source.index, 1);
      let newSourceCards = JSON.parse(JSON.stringify(SourceList.cards)).filter(card => card.id !== draggingCard.id);
      SourceList.cards = newSourceCards;
      DestinationList.cards.splice(destination.index, 0, draggingCard);
      //alert(destination.index)
      /*const NewState = {
        ..._AllCardData,
        lists: {
          ..._AllCardData.lists,
          [SourceList.id]: SourceList
        }
      };
      setAllCardData(NewState);*/
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
      //console.log("move to other list");
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
  /*const onDragUpdate = update => {
    //return
    const queryAttr = "data-rbd-drag-handle-draggable-id";
    if(!update.destination) return;
    
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    
    if (!draggedDOM) return;
    
    const { clientHeight } = draggedDOM;
    let helpBlock = document.createElement('div');
    var textNode = document.createTextNode("Hello world!");
    helpBlock.appendChild(textNode)
    draggedDOM.parentElement.parentElement.appendChild(helpBlock)
    const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.parentNode.children]
    .slice(0, destinationIndex)
    .reduce((total, curr) => {
      const style = curr.children[0].children[0].currentStyle || window.getComputedStyle(curr.childNodes[0].childNodes[0]);
      const marginBottom = parseFloat(style.marginBottom);
      const paddingBottom = parseFloat(style.paddingBottom);
      const paddingTop = parseFloat(style.paddingTop);
      const clientHeight = parseFloat(style.height);
      //console.log(style)
      return total + (clientHeight + paddingTop + paddingBottom + marginBottom);
    }, 0);
    const clientWidth = parseFloat(window.getComputedStyle(draggedDOM.childNodes[0]).width)
      + parseFloat(window.getComputedStyle(draggedDOM.childNodes[0]).marginLeft)
      + parseFloat(window.getComputedStyle(draggedDOM.childNodes[0]).marginRight)
    //背景卡片的位置
    setBgProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.childNodes[0]).marginLeft)
    });
  };*/
  const onDragUpdate = update => {
    let el = document.getElementById('bgCard');
    if(el) el.remove()
    //return
    const queryAttr = "data-rbd-drag-handle-draggable-id";
    if(!update.destination) return;
    
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    
    if (!draggedDOM) return;
    
    const { clientHeight } = draggedDOM;
    let bgCard = document.createElement('div');
    bgCard.id = 'bgCard'
    
    const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.parentNode.children]
    .slice(0, destinationIndex)
    .reduce((total, curr) => {
      const style = curr.children[0].children[0].currentStyle || window.getComputedStyle(curr.childNodes[0].childNodes[0]);
      const marginBottom = parseFloat(style.marginBottom);
      const paddingBottom = parseFloat(style.paddingBottom);
      const paddingTop = parseFloat(style.paddingTop);
      const clientHeight = parseFloat(style.height);
      //console.log(style)
      return total + (clientHeight + paddingTop + paddingBottom + marginBottom);
    }, 0);
    const clientWidth = parseFloat(window.getComputedStyle(draggedDOM.childNodes[0]).width)
      + parseFloat(window.getComputedStyle(draggedDOM.childNodes[0]).marginLeft)
      + parseFloat(window.getComputedStyle(draggedDOM.childNodes[0]).marginRight)
      bgCard.style.cssText = `
      height: ${clientHeight}px; 
      width: ${clientWidth}px;
      margin: 0px 8px 8px 8px;
      background-color: red;
      
    `
    let target = draggedDOM.parentNode.parentNode.children[destinationIndex];
    console.log(target)
    target.appendChild(bgCard)
    console.log(target)
    //target.insertBefore(bgCard, target.nextSibling);
    //draggedDOM.parentElement.parentElement.appendChild(bgCard)
    //背景卡片的位置
    /*setBgProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.childNodes[0]).marginLeft)
    });*/
  };
  const ListLayer = (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
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