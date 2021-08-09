import React,{useState, useEffect, useContext} from 'react';
import styled from "styled-components";
//context
import { ToDoListContext } from './Container';
//icon
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
//api
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #172b4d;
  font-weight: 600;
  font-size: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
`
const Span = styled.span`
  height: 32px;
  line-height: 32px;
`
const Button = styled.button`
  background-color: ${props =>props.bgColor ? props.bgColor : 'rgba(9, 30, 66, 0.04)'};
  display: ${props => (props.Edit === true) ? 'none' : 'block'};
  border-radius: 3px;
  border: none;
  color: ${props => props.color ? props.color : '#172b4d'};
  padding: 6px 12px 6px 12px;
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-right: ${props => props.marginRight ? props.marginRight : null};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : '#E2E4E9'};
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.direction ? props.direction : 'row'};
  align-items: ${props => props.alignItems ? props.alignItems : 'center'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
`
const BgCard = styled.div`
  position: absolute;
  top: ${props => props.BgProps ? props.BgProps.clientY : 0}px;
  left: ${props => props.BgProps ? props.BgProps.clientX : 0}px;
  height: ${props => props.BgProps ? props.BgProps.clientHeight : null}px;
  width: ${props => props.BgProps ? props.BgProps.clientWidth : null}px;
  background: pink;
`
const List = styled.div`
  position: relative;
  padding-left: 8px;
`
const Item = styled.div`
  position: relative;
  padding: 6px 0px 6px 0px;
  margin: 0 0 8px 0;
  background: ${props => props.isDragging ? 'lightgreen' : 'gray'};
  ${props => props.draggableStyle ? {...props.draggableStyle} : null};
`
//重新計算清單順序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};
const queryAttr = "data-rbd-drag-handle-draggable-id";
//------------------ start ------------------
const ListContainer = ({Icon}) => {
  const [BgProps, setBgProps] = useState({});
  const [cards, setcards] = useState([
    {
      id: '123',
      context: '123',
      done: false
    },
    {
      id: '456',
      context: '456',
      done: false
    },
    {
      id: '789',
      context: '789',
      done: true
    }
  ])
  //const [UIdata, setUIdata] = useState(null);
  const {CheckList, setCheckList} = useContext(ToDoListContext);
  
  //拖曳結束更新哪片順序
  const onDragEnd = result => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}
    setBgProps({})
		setcards(items => reorder(items, result.source.index, result.destination.index));
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
    //背景卡片的位置
		setBgProps({
			clientHeight,
			clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
		});
	};
  const Lists = CheckList ? (
    CheckList.map((list, index) => (
      <Droppable key={list.id} droppableId={list.id}>
        {(provided, snapshot) => (
          <List key={list.id} ref={provided.innerRef} {...provided.droppableProps}>
            {test(list.ToDoList)}
            {provided.placeholder}
            <BgCard key={list.id} BgProps={BgProps} />
          </List>
        )}
      </Droppable>
    ))
  ) : null;
  const test = ToDoList => {
    return ToDoList.map((todo, index) => (
      <Draggable key={todo.id} draggableId={todo.id} index={index}>
        {(provided, snapshot) => (
          <Item 
            key={todo.id}
            ref={provided.innerRef}
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
            isDragging={snapshot.isDragging} 
            draggableStyle={provided.draggableProps.style} 
          >
            {todo.context}
          </Item>
        )}
      </Draggable>
    ))
  }
  const ListItems = cards.map((card, index) => (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Item 
          ref={provided.innerRef}
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          isDragging={snapshot.isDragging} 
          draggableStyle={provided.draggableProps.style} 
        >
          {card.context}
        </Item>
      )}
    </Draggable>
  ))
  return(
    <Wrapper>
      <Title>
        <Container>
          <Icon marginRight='8px'>
            <CheckBoxOutlinedIcon />
          </Icon>
          <Span>描述</Span>
        </Container>
        <Container>
          <Button marginRight='8px'>隱藏已打勾的項目</Button>
          <Button>刪除</Button>
        </Container>
    </Title>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        {Lists}
        {/*<Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {ListItems}
              {provided.placeholder}
              <BgCard BgProps={BgProps} />
            </List>
          )}
          </Droppable>*/}
      </DragDropContext>
    </Wrapper>
  )
}
export default ListContainer;