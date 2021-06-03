import React from "react";
//component
import Tag from './Tag';

import { Draggable } from "react-beautiful-dnd";
//icon
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import zIndex from "@material-ui/core/styles/zIndex";

export default function Card({ card, index }) {
  const _root = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 8px 8px 8px',
    padding: '8px',
    borderColor: 'rgba(0, 0, 0, 0.87)',
    borderStyle: 'none',
    borderWidth: '0px',
    borderRadius: '4px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  }
  const _header = {
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 30
  }
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <div style={_root}>
            <div style={_header}>
              <Tag tagID={card.tagID} />
              <span>
                <CreateOutlinedIcon style={{fontSize:16}} />
              </span>
            </div>
            <span>{card.context}</span>         
          </div>
        </div>
      )}
    </Draggable>
  );
}
//原本 <Draggable /> 內的程式
/*<div className={classes.root} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
  <Paper className={classes.Card}>{card.context}</Paper>
</div>*/