import React,{useState, useEffect, useRef, useContext} from 'react';
import styled from "styled-components";
//component
import Panel1 from '../../../Panel1';
//context
import { ToDoListContext } from '../Container';
//icon
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CloseIcon from '@material-ui/icons/Close';
//api
import db from '../../../API';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #172b4d;
  font-weight: 600;
  font-size: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
`
const Container = styled.div`
  width: ${props => props.width ? props.width : null};
  display: ${props => props.display ? props.display : 'flex'};
  flex-direction: ${props => props.direction ? props.direction : 'row'};
  align-items: ${props => props.alignItems ? props.alignItems : 'center'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
  margin: ${props => props.margin ? props.margin : null};
  flex-grow: ${props => props.flexGrow ? props.flexGrow : null};
`
const Span = styled.div`
  flex: 1;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
`
const Button = styled.button`
  background-color: ${props =>props.bgColor ? props.bgColor : 'rgba(9, 30, 66, 0.04)'};
  display: ${props => (props.Edit === true) ? 'none' : 'block'};
  border-radius: 3px;
  border: none;
  color: ${props => props.color ? props.color : '#172b4d'};
  padding: 6px 12px 6px 12px;
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-right: ${props => props.marginRight ? props.marginRight : null};
  margin-top: ${props => props.marginTop ? props.marginTop : null};
  width: ${props => props.width ? props.width : null};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : '#E2E4E9'};
  }
`
const Textarea = styled.textarea`
  color: #172b4d;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  border: 1px solid rgba(9,30,66,.13);
  background: rgba(9,30,66,.04);
  outline: none;
  resize: none;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 8px 12px 8px 12px;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
`
const TitleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
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
const Hr = styled.div`
  border-bottom: 1px solid #D5D9E0;
  margin: 0px 10px 0px 10px;
`
const PanelComponent = ({propsObj, close}) => {
  const { fnc, btnName } = propsObj;
  const btnProps = {width: '100%', marginTop: '15px', color: '#FFF', bgColor: '#b04632', hoverColor: '#933b27'};
  const handleClick = () => {
    fnc();
    close();
  }
  return(
    <div>
      <Header>
        <TitleText>刪除代辦清單</TitleText>
        <Icon right='0' onClick={close}>
          <CloseIcon />
        </Icon>
      </Header>
      <Hr />
      <div style={{padding: '8px'}}>
        <TitleText>刪除待辦清單是永久性的，無法復原。</TitleText>
        <Button onClick={handleClick} {...btnProps}>{btnName}</Button>
      </div>
    </div>
  )
}
const ListTitle = ({Icon, card, title, Listid, ToDoList, Hidden, setHidden}) => {
  const [ItemNum, setItemNum] = useState();
  const [Edit, setEdit] = useState(false);
  const [oriTitle, setoriTitle] = useState(title);
  const [newTitle, setnewTitle] = useState(title);
  const [Position, setPosition] = useState(null);
  const [propsObj, setpropsObj] = useState(null);
  const Ref = useRef();
  const {ToDoListContext_Obj} = useContext(ToDoListContext);  //卡片的代辦清單
  const {CheckList, setCheckList} = ToDoListContext_Obj;
  useEffect(() => {
    const num = ToDoList.reduce((total, curr) => {
      if(curr.done === true) total = total + 1;
      return total
    },0);
    setItemNum(num);
  }, [ToDoList]);
  useEffect(() => {
    setoriTitle(title);
    setnewTitle(title);
  },[title])
  //切換要不要隱藏已完成項目
  const handleClick = () => {
    setHidden(!Hidden);
  }
  //刪除代辦清單 
  const handleDelete = ref => {
    const client = ref.current.getBoundingClientRect();
    const Top = `${client.y + client.height}px`;
    const Left = `${client.x}px`;               
    const width = '330px';     
    //更新UIdata
    const fnc = () => {
      //更新UIdata
      const newState = CheckList.filter(List => List.id !== Listid);
      setCheckList(newState);
      //更新firebase
      let docRef = db.collection('Card_ToDoList').doc(card.id);
      docRef.set({
        ListArray: newState
      });
    }    
		setPosition({Top, Left, width});
    setpropsObj({fnc, btnName:`刪除${newTitle}`});
  }
  //編輯模式時點擊儲存
  const handleSave = () => {
    //關閉編輯模式、更新oriTitle
    setEdit(false);
    setoriTitle(newTitle);
    //更新UIdata
    //一張卡片可能有多個list，找到現在卡片所屬的list
		let _List = JSON.parse(JSON.stringify(CheckList.find(List => List.id === Listid)));
    const index = CheckList.findIndex(List => List.id === Listid);
    _List.title = newTitle;
    let newState = [...CheckList];
    newState[index] = _List;
    setCheckList(newState);
    //更新firebase
    let docRef = db.collection('Card_ToDoList').doc(card.id);
    docRef.set({
      ListArray: newState
    });
  }
  const handleClose = () => {
    setEdit(false);
    setnewTitle(oriTitle);
  }
  const handleKeyDown = event => {
    if(event.keyCode === 13) handleSave()
  }
  const close = () => {
    setPosition(null);
    setpropsObj(null);
  }
  const btnProps = {bgColor:'#0079BF', hoverColor:'#156AA7', color:'#FFF'};
  const editProps = {width:'100%', direction:'column', alignItems:'flex-start'};
  const UIdata = Edit ? (
    <Container {...editProps} >
      <Textarea value={newTitle} onKeyDown={handleKeyDown} onChange={(e) => setnewTitle(e.target.value)} />
      <Container margin='5px 0 0 0'>
        <Button onClick={handleSave} {...btnProps} >儲存</Button>
        <Icon cursor='pointer'>
          <CloseIcon onClick={handleClose} fontSize='large' />
        </Icon>
      </Container>
    </Container>
  ) : (
    <Span onClick={() => setEdit(true)}>{newTitle}</Span>
  )
  return(
    <Wrapper>
      <Container flexGrow='1' alignItems={Edit ? 'flex-start' : null}>
        <Icon marginRight='8px' marginTop={Edit ? '10px' : null}>
          <CheckBoxOutlinedIcon />
        </Icon>
        {UIdata}
      </Container>
      <Container display={Edit ? 'none' : null}>
        <Button marginRight='8px' onClick={handleClick}>{Hidden ? `顯示已打勾項目 (${ItemNum})` : '隱藏已打勾的項目'}</Button>
        <Button ref={Ref} onClick={() => handleDelete(Ref)}>刪除</Button>
      </Container>
      {Position ? (
          <Panel1 Top={Position.Top} Left={Position.Left} width={Position.width} close={close}>
            <PanelComponent propsObj={propsObj} close={close} />
          </Panel1>
      ) : (null)}
    </Wrapper>
  )
}
export default ListTitle;