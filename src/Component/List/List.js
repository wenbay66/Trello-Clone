import React,{ useContext } from "react";
//component
import Title from "./Title";
import Card from "./Card";
import InputContainer from "./InputContainer";
//context
import {TagContext} from '../../Container';
import {CardContext} from './Wrapper';
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function List({ list, index }) {
  //const classes = useStyle();
  const { TagContext_Obj } = useContext(TagContext);
  const { AllTagData, setAllTagData } = TagContext_Obj;
  const { AllCardData, setAllCardData, UpdateCardContext } = useContext(CardContext);

  const CardData = list.cards ? list.cards.map((card, index) => {
    const List_Obj = {
      'ListTitle': list.title,
      'ListID': list.id
    }
    const TagContext_Obj = {
      'AllTagData': AllTagData,
      'setAllTagData': setAllTagData
    }
    return (
      <Card
        key={card.id} 
        List_Obj={List_Obj}
        card={card} 
        TagContext_Obj={TagContext_Obj}
        CardContext_Obj={{AllCardData, setAllCardData, UpdateCardContext}}
        index={index}
      />
    );
  }) : null;
  const root = {
    width: "300px",
    backgroundColor: "#EBECF0",
    marginLeft: '8px',
    marginTop: '8px',
    paddingBottom: '8px',
    borderRadius: '3px'
  }
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div style={root} >
            <div {...provided.dragHandleProps}>
              <Title listId={list.id} title={list.title} />
              <Droppable droppableId={list.id}>
                {(provided) => (
                  <div style={{width: 'inherit'}} ref={provided.innerRef} {...provided.droppableProps}>
                    <div style={{width: 'inherit'}}>
                      {CardData}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
              <InputContainer type="Card" listId={list.id} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
/**
 * return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <Title listId={list.id} title={list.title} />
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {CardData}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <InputContainer type="Card" listId={list.id} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
 */
