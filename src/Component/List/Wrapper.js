import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
//css
import "../../Css/reset.css";
import "../../Css/styles.css";
//component
import List from "./List";
import InputContainer from "./InputContainer";
import CardPanel1 from '../../CardPanel1';
//api
import db, {update} from '../../../src/API';

const Container = styled.div`
  display: flex;
`
const Container1 = styled.div`
  height: calc(100% - 48px);
  overflow-x: auto;
`
export const CardContext = React.createContext();

//React.memo => props有改變就-render
const Wrapper = React.memo(function Wrapper() {
  const [AllCardData, setAllCardData] = useState(null);  //所有卡片資料
  const [Show, setShow] = useState(false);
  const [CardPanelData, setCardPanelData] = useState(null);
  //卡片資料(init render)串接firebase api
  useEffect(() => {
    async function getData(){
      await db.collection('Lists').get().then(Lists => {
        //取得所有列表的id, 方便之後更新api
        const listIds = Lists.docs.map(List => List.id);
        //所有列表的資料
        const lists = Lists.docs.reduce((Previous, Current) => {
          Previous[Current.id] = Object.assign({}, Current.data(), {id: Current.id});
          return Previous;
        }, {});
        const state = {listIds, lists};
        setAllCardData(state)
      })
    }
    getData();
  },[])
  
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
  },[])
  //新增卡片
  const AddNewCard = (title, listid) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      context: title
    };
    const list = AllCardData.lists[listid];
    //list.cards = [...list.cards, newCard];
    list.cards = list.cards ? [...list.cards, newCard] : [newCard];
    const newState = {
      ...AllCardData,
      lists: {
        ...AllCardData.lists,
        [listid]: list
      }
    };
    //更新新增的卡片到 firebase
    let docRef = db.collection('Lists').doc(listid);
    docRef.update({
      cards: update.FieldValue.arrayUnion(newCard)
    });
    //更新UI畫面
    setAllCardData(newState);
  };
  //新增列表
  const AddNewList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: []
    };
    const newState = {
      listIds: [...AllCardData.listIds, newListId],
      lists: {
        ...AllCardData.lists,
        [newListId]: newList
      }
    };
    //更新新增的列表到 firebase
    let docRef = db.collection('Lists').doc(newListId);
    docRef.set({
      title
    });
    //更新UI畫面
    setAllCardData(newState);
  };
  //更新卡片名稱
  const UpdateCardContext = (NewCardContext, ListID, card) => {
    //更新 UI data
    const cards = AllCardData.lists[ListID].cards; //卡片所屬的列表所有資料 => AllCardData.lists[ListID];
    //step1 複製出列表下所有卡片資料
    const _cards = JSON.parse(JSON.stringify(cards));
    //step2 修改要更改的卡片
    _cards.every(element => {
      if(element.id === card.id){
        element.context = NewCardContext;
        return false;
      }
      return true;
    });
    //step3 產生新的所有列表資料
    let _lists = {
      ...AllCardData.lists,
      [ListID]: {
        ...AllCardData.lists[ListID],
        cards: _cards
      }
    }
    //新的UI data
    let newData = {
      listIds: [...AllCardData.listIds],
      lists: _lists
    }
    //更新context資料
    setAllCardData(newData)
    //更新firebase資料
    let docRef = db.collection('Lists').doc(ListID);
    docRef.update({
      cards: _cards
    })
  }
  //更新列表名稱
  const UpDateTitle = (NewTitle, listid) => {
    const newList = AllCardData.lists[listid];
    newList.title = NewTitle;
    const newState = {
      listIds: [...AllCardData.listIds],
      lists: {
        ...AllCardData.lists,
        [listid]: newList
      }
    };
    //更新新的列表名稱到firebase
    let docRef = db.collection('Lists').doc(listid);
    docRef.update({
      title: NewTitle
    });
    //更新UI畫面
    setAllCardData(newState);
  };
  //拖曳結束時
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
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
    //拖曳開始的看板、起始的位置
    const SourceList = AllCardData.lists[source.droppableId];
    //拖曳結束時的看板、放下的位置
    const DestinationList = AllCardData.lists[destination.droppableId];
    //被拖曳的卡片
    const draggingCard = SourceList.cards.filter((card) => {
      return card.id === draggableId;
    })[0];
    //卡片在同一個看板間移動
    if (source.droppableId === destination.droppableId) {
      //刪除拖曳的卡片
      SourceList.cards.splice(source.index, 1);
      SourceList.cards.splice(destination.index, 0, draggingCard);
      const NewState = {
        ...AllCardData,
        lists: {
          ...AllCardData.lists,
          [SourceList.id]: SourceList
        }
      };
      setAllCardData(NewState);
    }
    //卡片移動至另一個看板
    if (source.droppableId !== destination.droppableId) {
      SourceList.cards.splice(source.index, 1);
      DestinationList.cards.splice(destination.index, 0, draggingCard);
      const NewState = {
        ...AllCardData,
        lists: {
          ...AllCardData.lists,
          [SourceList.id]: SourceList
        }
      };
      setAllCardData(NewState);
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
    return <List list={list} key={listId} index={index} />;
  }) : ('');
  const CardContext_Obj = {
    'AllCardData': AllCardData,
    'setAllCardData': setAllCardData,
    'AddNewCard': AddNewCard,
    'AddNewList': AddNewList,
    'UpDateTitle': UpDateTitle,
    'UpdateCardContext': UpdateCardContext,
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
})
export default Wrapper;