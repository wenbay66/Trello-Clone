import React,{useState, useEffect, useContext} from 'react';
import styled from "styled-components";
//component
import List from './ChildComponent/List';
//context
import { ToDoListContext } from './Container';
const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
`
const ListContainer = ({Icon}) => {
  //const [UIdata, setUIdata] = useState(null);
  const {CheckList, setCheckList} = useContext(ToDoListContext);
  
  return(
    <Wrapper>
      {CheckList? (
        CheckList.map((list, index) => {
          return <List key={index} index={index} list={list} Icon={Icon} setCheckList={setCheckList} />
        })
      ) : null}
    </Wrapper>
  )
}
export default ListContainer;