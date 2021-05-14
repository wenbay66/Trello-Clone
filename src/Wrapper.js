import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Story from "./Utils/Story";
import { makeStyles } from "@material-ui/core/styles";
import Storyapi from "./Utils/Storyapi";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import "./reset.css";
import "./styles.css";
import List from "./Component/List/List";
import InputContainer from "./Component/List/InputContainer";
//import InputTextarea from "./Component/List/InputTextarea";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeigh: "100vh"
    //padding:theme.spacing(1)
  }
}));
export default function Wrapper() {
  const className = useStyle();
  const [data, setdata] = useState(Story);
  //新增卡片
  const AddNewCard = (title, listid) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      context: title
    };
    const list = data.lists[listid];
    list.cards = [...list.cards, newCard];
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listid]: list
      }
    };
    console.log(newState);
    setdata(newState);
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
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList
      }
    };
    setdata(newState);
  };
  //更新列表名稱
  const UpDateTitle = (NewTitle, listid) => {
    const newList = data.lists[listid];
    newList.title = NewTitle;
    const newState = {
      listIds: [...data.listIds],
      lists: {
        ...data.lists,
        [listid]: newList
      }
    };
    setdata(newState);
  };
  //拖曳結束時
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    //變更看板順序
    if (type === "List") {
      //利用淺拷貝問題
      const NewListIds = data.listIds;
      NewListIds.splice(source.index, 1);
      NewListIds.splice(destination.index, 0, draggableId);
      return;
    }
    //拖曳開始的看板、起始的位置
    const SourceList = data.lists[source.droppableId];
    //拖曳結束時的看板、放下的位置
    const DestinationList = data.lists[destination.droppableId];
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
        ...data,
        lists: {
          ...data.lists,
          [SourceList.id]: SourceList
        }
      };
      setdata(NewState);
    }
    //卡片移動至另一個看板
    if (source.droppableId !== destination.droppableId) {
      SourceList.cards.splice(source.index, 1);
      console.log(DestinationList);
      DestinationList.cards.splice(destination.index, 0, draggingCard);
      const NewState = {
        ...data,
        lists: {
          ...data.lists,
          [SourceList.id]: SourceList
        }
      };
      setdata(NewState);
      //console.log("move to other list");
    }
  };
  const onDragEnd1 = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggCard = sourceList.cards.filter((card) => card.id === draggableId)[0];
    console.log(draggCard);
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      sourceList.cards.splice(destination.index, 0, draggCard);
      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList
        }
      };
      setdata(newState);
    }
  };
  return (
    <Storyapi.Provider value={{ AddNewCard, AddNewList, UpDateTitle }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="List" direction="horizontal">
          {(provided) => (
            <div className={className.root} ref={provided.innerRef} {...provided.droppableProps}>
              {data.listIds.map((listId, index) => {
                const list = data.lists[listId];
                return <List list={list} key={listId} index={index} />;
              })}
              <InputContainer type="List" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Storyapi.Provider>
  );
  /*return (
    <Storyapi.Provider value={{ AddNewCard, AddNewList, UpDateTitle }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="List" direction="horizontal">
          {(provided) => (
            <div className={className.root} ref={provided.innerRef} {...provided.droppableProps}>
              {data.listIds.map((listId, index) => {
                const list = data.lists[listId];
                return <List list={list} key={listId} index={index} />;
              })}
              <InputTextarea type="list" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Storyapi.Provider>
  );*/
}
