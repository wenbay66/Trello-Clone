import React,{useState, useContext} from 'react';
//component
import Title from "./Title";
import Container from './Container';
//temp
//import SetTag from './SetTag';
import { TagContext } from '../../Container';

const MODAL_STYLE = {
  backgroundColor: '#F4F5F7',
  width: '100%',
  height: '100%',
}
const CONTAINER = {
  padding: '12px 6px 12px 6px',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  height: 'calc(100% - 60px)',
  overflowY: 'scroll',
}
export const GoNextContext = React.createContext();

export default function Menu({isOpen, handleClose}){
  const [TitleTextList, setTitleTextList] = useState([]);
  const [ComponentList, setComponentList] = useState([]);
  const [Component, setComponent] = useState(null);
  const TagContext_Obj = useContext(TagContext);
  //回上一個 Component
  const GoBack = () => {
    const _ComponentList = [...ComponentList];
    _ComponentList.pop();
    const _TitleTextList = [...TitleTextList];
    _TitleTextList.pop();
    setComponentList(_ComponentList);
    setTitleTextList(_TitleTextList);
    //依照 UI click 的元件渲染，不要一次 import 全部元件。 _ComponentList.length === 0 => 代表目前正在選單畫面。
    reCalculation(_ComponentList);
  }
  //去下一個 Component
  const GoNext = (NextComponent, NextTitleText, propsObj) => {
    const _ComponentList = [...ComponentList];
    _ComponentList.push(NextComponent);
    const _TitleTextList = [...TitleTextList];
    _TitleTextList.push(NextTitleText);
    setComponentList(_ComponentList);
    setTitleTextList(_TitleTextList);
    //依照 UI click 的元件渲染，不要一次 import 全部元件。 _ComponentList.length === 0 => 代表目前正在選單畫面。
    reCalculation(_ComponentList, propsObj);
  }
  //依照 UI click 的元件渲染，不要一次 import 全部元件。 _ComponentList.length === 0 => 代表目前正在選單畫面。
  const reCalculation = (_ComponentList, propsObj) => {
    if(_ComponentList.length === 0) return;
    let Component = require(`./${_ComponentList[_ComponentList.length - 1]}`).default;
    let props = propsObj ? (
      {
        [propsObj.Name]: propsObj.Obj      
      }
    ) : null;
    setComponent(<Component {...props} />);
  }
  console.log('<-- menu -->')
  console.log(TagContext_Obj)
  return(
    <GoNextContext.Provider value={GoNext}>
      <div style={MODAL_STYLE}>
        <Title handleClose={handleClose} TitleTextList={TitleTextList} ComponentList={ComponentList} GoBack={GoBack} />
        <div style={CONTAINER}>
          {ComponentList.length===0 ? <Container /> : Component}
        </div>
      </div>
    </GoNextContext.Provider>
  )
}