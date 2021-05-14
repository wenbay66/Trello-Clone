import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Title from "./Title";
import Card from "./Card";
import InputContainer from "./InputContainer";
import { Droppable, Draggable } from "react-beautiful-dnd";
const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));
export default function List({ list, index }) {
  const classes = useStyle();
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <Title listId={list.id} title={list.title} />
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list.cards.map((card, index) => {
                    return <Card card={card} key={card.id} index={index} />;
                  })}
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
}
