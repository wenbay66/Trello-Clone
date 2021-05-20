import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 1, 1, 1)
    //marginBottom: theme.spacing(1)
  },
  Card: {
    padding: theme.spacing(1, 1, 1, 1)
  },
  test:{
    
  }
}));
export default function Card({ card, index }) {
  const classes = useStyle();
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div 
          className={classes.root} 
          ref={provided.innerRef}
          {...provided.dragHandleProps} 
          {...provided.draggableProps}
        >
          <Paper className={classes.Card}>{card.context}</Paper>
        </div>
      )}
    </Draggable>
  );
}
