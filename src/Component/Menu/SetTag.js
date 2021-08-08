import React,{useState, useEffect, useRef, useContext} from 'react';
import styled,{keyframes} from "styled-components";
//component
import Panel1 from '../../Panel1';
import Tag from './Tag';
import ModifyTag from './ModifyTag';
//context
import {TagContext} from '../../Container';
//api
import { v4 as uuid } from "uuid";
import db from '../../API';
//icon
import CloseIcon from '@material-ui/icons/Close';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
//import db from '../../../API';
const animat = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0%;
  }
`;
//Wrapper 預設有動畫，如果不要動畫需傳參數animat=false
const Wrapper = styled.div`
  dislay: flex;
  flex-direction: column;
  padding: 0px 8px 0px 8px; 
  width: 100%;
  position: relative;
  animation: ${props => props.animat === false ? '' : animat} .1s ease-in;
`
const SearchBox = styled.input`
  box-sizing:border-box;
  width: 100%;
  padding: 8px 12px 8px 12px;
  margin-bottom: 12px;
  outline-style: none;
  background-origin: padding-box;
  background-clip: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  border: 2px solid #D5D9E0;
  font-weight: 400;
  ::-webkit-input-placeholder {
    color: #5e6c84;
  }
  &:focus {
    border: 2px solid #0079bf;
  }
`
const H4 = styled.h4`
  color: #5E6C84;
  margin-bottom: 12px;
`
const Button = styled.button`
  margin-top: 15px;
  padding: 8px 0px 8px 0px;
  width: 100%;
  background-color: rgba(9,30,66,.04);
  cursor: pointer;
  border-radius: 3px;
  color: rgb(23, 43, 77);
  font-size: 14px;
  font-weight: 400;
  outline: none;
  border: none;
  &:hover{
    background-color: #E2E4E9;
  }
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
`
const Hr = styled.div`
  border-bottom: 1px solid #D5D9E0;
  margin: 0px 10px 0px 10px;
`
const TitleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  color: #5e6c84;
`
const Icon = styled.div`
  display: ${props => props.display ? props.display : 'flex'};
  position: absolute;
  left: ${props => props.left ? props.left : ''};
  right: ${props => props.right ? props.right : ''};
  justify-content: center;
  align-items: center; 
  width: 20px;
  height: 20px;
  padding: 10px 8px 10px 8px;
  color: #5e6c84;
  cursor: pointer;
`
const SetTag = ({handleClick, IconClick, CreateClick, card_tagIDs, animat}) => {
  //handleClick, IconClick, card_tagIDs, animat => 卡片詳細資料傳入,不傳就執行預設動作
  const [UIdata, setUIdata] = useState(null);
  const [SearchText, setSearchText] = useState('');
  const {TagContext_Obj} = useContext(TagContext);
  const {AllTagData, setAllTagData} = TagContext_Obj;
  const [Position, setPosition] = useState(null);
  const [PanelProps, setPanelProps] = useState(null);
  const [HeaderTitle, setHeaderTitle] = useState([]);//add
  //const [CurrentTagData, setCurrentTagData] = useState(AllTagData);
  const Ref = useRef();
  const childrenRef = useRef(null);
  //建立全新標籤
  const CreateTag = (event) => {
    const client = Ref.current.getBoundingClientRect();
    //top、left、width、tagName
    const Top = `${client.y}px`; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
    const Left = `${client.x - client.width - 16}px`;                    //加上半個 icon 的寬度比較好看
    const width = `${client.width}px`;               //需扣掉半個 icon 寬度
    //click 新建
    const Submit = async (event, close, newTag) => {
      //return
      const {Title, TagColor} = newTag;
      if(Title === '' || TagColor === null) return;
      let _AllTagData = AllTagData ? [...AllTagData] : [];
      const newData = { 'tagName': Title, 'bgColor':TagColor, 'tagID': uuid() };
      _AllTagData.push(newData);
      setAllTagData(_AllTagData);
      //更新firebase
      let docRef = await db.collection('Tag').doc(newData.tagID);
      docRef.set({
        'tagName': Title,
        'bgColor': TagColor
      });
      close();
    };
    setPosition({'Top': Top, 'Left': Left, 'width': width});
    setPanelProps({
      'title': '新增標籤',
      'tagData': null,
      'Submit': Submit
    })
  }
  const CheckConfirm = () => childrenRef.current ? childrenRef.current.CheckConfirm() : null;
  //修改標籤
  const EditTag = (e, client, tagData) => {
    //top、left、width、tagName
    const Top = `${client.y + client.height + 2}px`; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
    const Left = `${client.x + 16}px`;               //加上半個 icon 的寬度比較好看
    const width = `${client.width - 16}px`;          //需扣掉半個 icon 寬度
    
    //click 儲存
    const Submit = async (event, oriTagData, newTag) => {
      const {Title, TagColor} = newTag;
      if(Title === '' || TagColor === null) return;
      //沒有修改(直接結束)
      if(oriTagData.tagName === Title && oriTagData.bgColor === TagColor){
        setPosition(null);
        setPanelProps(null);
        return;
      };
      let _AllTagData = AllTagData ? [...AllTagData] : [];
      //更新畫面資料
      _AllTagData.every(tag => {
        if(tag.tagID === oriTagData.tagID){
          tag.tagName = Title;
          tag.bgColor = TagColor;
          return false;
        };
        return true;
      });
      setAllTagData(_AllTagData);
      //更新firebase
      let docRef = await db.collection('Tag').doc(oriTagData.tagID);
      docRef.update({
        'tagName': Title,
        'bgColor': TagColor
      });
      setPosition(null);
      setPanelProps(null);
    }
    setPosition({'Top': Top, 'Left': Left, 'width': width});
    setPanelProps({
      'tagData': tagData,
      'AllTagData': AllTagData,
      'setAllTagData': setAllTagData,
      'Submit': Submit
    })
  }
  const GoNext = (title) => {
    const _HeaderTitle = HeaderTitle.length === 0 ? [] : [...HeaderTitle];
    _HeaderTitle.push(title);
    setHeaderTitle(_HeaderTitle);
  };
  const GoBack = () => {
    const _HeaderTitle = [...HeaderTitle];
    _HeaderTitle.pop();
    setHeaderTitle(_HeaderTitle);
    CheckConfirm();
  }
  //計算畫面資料
  useEffect(() => {
    if (AllTagData === null) return;
    setUIdata(getUIdata());
  },[AllTagData, card_tagIDs])// eslint-disable-line react-hooks/exhaustive-deps
  //根據SearchText改變畫面資料
  useEffect(() => {
    const search = () => {
      if (AllTagData === null) return;
      setUIdata(getUIdata());
    }
    //search after .5s beacuse efficient
    const timeoutID = setTimeout( () => { 
      search();
    }, 500);
    return () => {
      clearTimeout(timeoutID)
    }
  },[SearchText])// eslint-disable-line react-hooks/exhaustive-deps
  const close = () => {
    setPosition(null);
    setHeaderTitle([]);
  }
  //計算畫面資料
  const getUIdata = () => {
    if(!AllTagData) return;
    return AllTagData
    .filter(tagData => {  //如果有輸入搜尋文字,畫面資料須包含搜尋文字
      let tagName = tagData.tagName.toUpperCase();
      return SearchText === '' ? (tagData) : (tagName.indexOf(SearchText.toUpperCase()) !== -1);
    })
    .map((tagData, index) => {  //根據filter結果渲染畫面資料
      return (
        <Tag 
          key={index} 
          data={tagData} 
          //由CardPanel傳進來
          checked={card_tagIDs ? card_tagIDs.includes(tagData.tagID) : null}
          handleClick={handleClick ? handleClick : EditTag} 
          IconClick={IconClick ? IconClick : EditTag} 
        />
      )
    });
  }
  console.log('PanelProps = ', PanelProps)
  return(
    <Wrapper animat={animat}>
      <SearchBox placeholder='搜尋標籤...' onChange={e => setSearchText(e.target.value)} />
      <H4>標籤</H4>
      <div ref={Ref}>{UIdata ? UIdata : ''}</div>
      <Button onClick={CreateClick ? CreateClick : CreateTag}>建立新標籤</Button>
      {Position ? (
        <Panel1 close={close} Top={Position.Top} Left={Position.Left} width={Position.width} Title={PanelProps.title}>
          <Header>
            <Icon left='0' display={HeaderTitle.length === 0 ? 'none' : null} onClick={GoBack}>
              <NavigateBeforeOutlinedIcon />
            </Icon>
            <TitleText>{PanelProps.title ? (
              PanelProps.title
             ) : (
              HeaderTitle.length === 0 ? '修改標籤' : HeaderTitle[HeaderTitle.length - 1]
             )}</TitleText>
            <Icon right='0' onClick={() => setPosition(null)}>
              <CloseIcon />
            </Icon>
          </Header>
          <Hr />
          <ModifyTag ref={childrenRef} GoNext={GoNext} propsObj={PanelProps} close={() => setPosition(null)} />
        </Panel1>
      ) : null}
    </Wrapper>
  )
}
export default SetTag;