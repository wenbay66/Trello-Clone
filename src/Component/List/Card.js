import React, {useState, useContext} from "react";
//component
import Tag from './Tag';
import CardPanel from '../../CardPanel';
import CardPanel1 from '../../CardPanel1';
import ModifyCard from "./ModifyCard";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
//icon
import CreateIcon from '@material-ui/icons/Create';
//context
import {CardContext} from './Wrapper';

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
const Wrapper = styled.div`
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
export default function Card(props) {
  const {card, index, List_Obj, TagContext_Obj, CardContext_Obj} = props;
  //const [show, setshow] = useState(false);
  const {OpenCard} = useContext(CardContext);
  const OpenCard1 = () => {
    const paraObj = {
      'List_Obj': List_Obj,
      'TagContext_Obj': TagContext_Obj,    //source: src/Container.js
      'CardContext_Obj': CardContext_Obj,  //sourec: src/List/Wrapper.js
      'card': card
    }
    CardPanel.open({
      'component': ModifyCard,  //CardPanel要渲染的組件
      'paraObj': paraObj        //帶進ModifyCard.js 的傳參
    });
  }
  const EditCard = (event) => {
    event.stopPropagation();
    alert(card.context);
  }
  
  const cardLayer = (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <Wrapper onClick={() => OpenCard(card, List_Obj)}>
            <Icon onClick={EditCard}>
              <CreateIcon style={{fontSize:'12px',color:'#5e6c84'}} />
            </Icon>
            <Tag tagID={card.tagID} />
            <span>{card.context}</span>         
          </Wrapper>
        </div>  
      )}
    </Draggable>
  );
  return (
    <div>
      {cardLayer}
    </div>
  );
};