import React, { useState } from 'react';
import styled from "styled-components";
//component
import ListItem from './ListItem';
import ListTitle from './ListTitle';
//api
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  position: relative;
  margin-top: ${props => props.marginTop ? props.marginTop : null};
`
const ListContainer = styled.div`
  position: relative;
`
const BgCard = styled.div`
  position: absolute;
  top: ${props => props.BgProps ? props.BgProps.clientY : 0}px;
  left: ${props => props.BgProps ? props.BgProps.clientX : 0}px;
  height: ${props => props.BgProps ? props.BgProps.clientHeight : null}px;
  width: ${props => props.BgProps ? props.BgProps.clientWidth : null}px;
  background: #E2E4E9;
`
const Button = styled.button`
  background-color: rgba(9, 30, 66, 0.04);
  display: ${props => (props.Edit === true) ? 'none' : 'block'};
  border-radius: 3px;
  border: none;
  color: #172b4d;
  padding: 6px 12px 6px 12px;
  margin: 10px 0px 0px 40px;
  cursor: pointer;
  &:hover {
    background-color: #E2E4E9;
  }
`
const Item = styled.div`
  position: relative;  
  ${props => props.draggableStyle ? {...props.draggableStyle} : null};
`
//重新計算清單順序
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};
const List = ({list, setCheckList, index, Icon}) => {
  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const { id, title, ToDoList } = list;
  const [ToDo, setToDo] = useState(ToDoList);
  const [Hidden, setHidden] = useState(false);//是否隱藏以打勾項目
  const [BgProps, setBgProps] = useState({});
  //拖曳結束更新哪片順序
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setBgProps({})
    console.log(ToDo)
    setToDo(items => reorder(items, result.source.index, result.destination.index));
  };
  //更新背景卡片要出現的位置
  const onDragUpdate = update => {
    if(!update.destination) return;
    
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) return;
    
    const { clientHeight, clientWidth } = draggedDOM;
    const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
      .slice(0, destinationIndex)
      .reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);
      console.log(clientHeight)
    //背景卡片的位置
    setBgProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
    });
  };
  //清單項目
  const ListItems = ToDoList
  .filter(item => {//Hidden=false 顯示全部，反之顯示done=false
    return Hidden === false ? item : item.done === false;

  }).map((item, index) => (//根據filter的結果渲染UI
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} draggableStyle={provided.draggableProps.style}>
          <ListItem Listid={id} ToDo={item} Icon={Icon} isDragging={snapshot.isDragging} />
        </Item>
      )}
    </Draggable>
  ));
  
  return(
    <Wrapper marginTop={index > 0 ? '8px' : null}>
      <ListTitle Icon={Icon} title={title} Listid={id} ToDoList={ToDoList} Hidden={Hidden} setHidden={setHidden} />
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {ListItems}
              {provided.placeholder}
              <BgCard BgProps={BgProps} />
            </ListContainer>
          )}
        </Droppable>
      </DragDropContext>
      <Button>增加項目</Button>
    </Wrapper>
  )
}
export default List;