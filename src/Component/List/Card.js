import React from "react";
//component
import Tag from './Tag';

import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
//icon
import CreateIcon from '@material-ui/icons/Create';

const Icon = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0;
  padding: 2px 6px 2px 6px;
  border-radius: 4px;
  &:hover {
    background-color: #EDEEF2;
  }
`
const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0px 8px 8px 8px;
  padding: 8px;
  border-color: rgba(0, 0, 0, 0.87);
  border-style: none;
  border-width: 0px;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  &:hover ${Icon} {
    opacity: 1;
  };
`
export default function Card({ card, index, TagData }) {
  
  const OpenCard = () => {
    alert('123')
  }
  const EditCard = (event) => {
    event.stopPropagation();
    alert(card.context);
  }
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <Root onClick={OpenCard}>
            <Icon onClick={EditCard}>
              <CreateIcon style={{fontSize:'12px',color:'#5e6c84'}} />
            </Icon>
            <Tag tagID={card.tagID} />
            <span>{card.context}</span>         
          </Root>
        </div>  
      )}
    </Draggable>
  );
}
//原本 <Draggable /> 內的程式
/*<div className={classes.root} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
  <Paper className={classes.Card}>{card.context}</Paper>
</div>*/
/**
 * return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <Root onClick={fnc}>
            <CreateIcon style={_icon} />
            <div style={_header}>
              <Tag tagID={card.tagID} />
            </div>
            <span>{card.context}</span>         
          </Root>
        </div>  
      )}
    </Draggable>
  );
 */