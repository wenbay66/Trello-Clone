import React, {useContext} from 'react';
import styled from "styled-components";
//component
import Panel from '../../Panel';
import Box from './Box';
//context
//import {ToDoListContext} from './Container';
import { ModifyContext } from '../List/ModifyCard';
//icon
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Span = styled.span`
  color: #5E6C84;
  font-size: 12px;
  font-weight: 500;
`
const list = [
  {
    name: '成員',
    icon: PersonOutlineOutlinedIcon,
    ComponentName: 'Persion'
  },
  {
    name: '標籤',
    icon: LocalOfferOutlinedIcon,
    ComponentName: 'Tag'
  },
  {
    name: '待辦清單',
    icon: SpeakerNotesOutlinedIcon,
    ComponentName: 'ToDoList'
  },
  {
    name: '日期',
    icon: ScheduleOutlinedIcon,
    ComponentName: 'Persion'
  },
  {
    name: '附件',
    icon: AttachFileOutlinedIcon,
    ComponentName: 'Persion'
  },
  {
    name: '封面',
    icon: FeaturedPlayListOutlinedIcon,
    ComponentName: 'Persion'
  }
];
const SideBar = ({CheckList, setCheckList}) => {
  const {paraObj} = useContext(ModifyContext);

  //開啟彈出層
  const fnc = (client, name, ComponentName) => {
    //top、left、width、tagName
    const Top = `${client.y + client.height + 5}px`; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
    const Left = `${client.x}px`;   
    const width = '300px';         
    let _component = require(`./SideBarChild/${ComponentName}`).default;
    
    const propsObj = { Span, CheckList, setCheckList, ModifyContextObj:paraObj };
    /*const propsObj = {
      tagData: AllTagData[tagIndex],
      AllTagData: AllTagData,
      setAllTagData: setAllTagData
    }*/
    Panel.open({Top, Left, width, propsObj, component: _component, Title: name})
  }
  const UIdata = list.map((item, index) => {
    const Icon = item.icon;
    const props = {fnc:fnc, ComponentName:item.ComponentName, name:item.name}
    //console.log(item.name)
    return (
      <Box key={index} {...props} >
        <Icon style={{marginRight: '8px'}} fontSize='small' />
      </Box>
    )
  })
  
  return(
    <Wrapper>
      <Span>新增至卡片</Span>
      {UIdata}
    </Wrapper>
  )
}
export default SideBar;