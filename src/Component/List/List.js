import React from "react";
//component
import Title from "./Title";
import Card from "./Card";
import InputContainer from "./InputContainer";
//api
//import { makeStyles } from "@material-ui/core/styles";
//import { Paper } from "@material-ui/core";
import { Droppable, Draggable } from "react-beautiful-dnd";
/*const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));*/
export default function List({ list, index }) {
  //const classes = useStyle();
  const CardData = list.cards.map((card, index) => {
    return <Card card={card} key={card.id} index={index} />;
  })
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
