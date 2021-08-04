import React, { useState, useEffect } from 'react';
import styled from "styled-components";
//component
import TagContainer from './TagContainer';
import Description from './Description';
import ListContainer from './ListContainer';
import SideBar from './SideBar';
//api
import db from '../../API';

const Wrapper = styled.div`
  display: flex;
  flex-direcion: row;
  margin-top: 12px;
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding-right: 20px
`
const Right = styled.div`
  width: 25%;
`
export const ToDoListContext = React.createContext();
const Container = ({Icon, card, List_Obj}) => {
  const [CheckList, setCheckList] = useState([]);
  //待辦清單(firebase資料)
  useEffect(() => {
    //用card.id去firebase抓
    async function getDate(){
      let docRef = await db.collection('Card_ToDoList').doc(card.id);
      let docObj = await docRef.get().then(doc => doc.exists ? doc.data() : null);
      if(docObj === null) return;
      setCheckList(docObj.ListArray)
    }
    getDate();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  //待辦清單資料(測試環境)
  useEffect(() => {
    //data format
    const Example = [// eslint-disable-line no-unused-vars
      {
        id: '1qaz2wsx',
        title: '元件清單',
        ToDoList: [
          {
            id: 'ToDo-1',
            context: '修改menu.js',
            done: false
          },
          {
            id: 'ToDo-2',
            context: '測試menu.js',
            done: true
          }
        ]
      },
      {
        id: '3edc4rfvg',
        title: '測試清單',
        ToDoList: [
          {
            id: 'ToDo-3',
            context: '修改測試清單',
            done: false
          },
          {
            id: 'ToDo-4',
            context: '測試測試清單',
            done: true
          }
        ]
      }
    ];
    //setCheckList(Example);
  }, [])
  const ToDoListContext_Obj = {
    'CheckList': CheckList,
    'setCheckList': setCheckList
  } 
  return(
    <Wrapper>
      <ToDoListContext.Provider value={{ToDoListContext_Obj}}>
        <Left>
          <TagContainer card={card} List_Obj={List_Obj} Icon={Icon} />
          <Description card={card} Icon={Icon} />
          <ListContainer card={card} List_Obj={List_Obj} Icon={Icon} />
        </Left>
        <Right>
          <SideBar card={card} List_Obj={List_Obj} CheckList={CheckList} setCheckList={setCheckList} />
        </Right>
      </ToDoListContext.Provider>
    </Wrapper>
  )
}
export default Container;