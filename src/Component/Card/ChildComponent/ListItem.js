import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from "styled-components";
//context
import { ToDoListContext } from '../Container';
import { ModifyContext } from '../../List/ModifyCard';
//api
import { v4 as uuid } from "uuid";
import db from '../../../API';
//component
import Panel from '../../../Panel';
import InputArea from './InputArea';
//icon
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: ${props => props.alignItems ? props.alignItems : 'center'};
	padding: 6px 0 6px 0;
	background-color: ${props => props.isDragging ? 'rgba(9,30,66,0.04)' : null};
	color: rgb(23, 43, 77);
	&:hover {	
		background-color: rgba(9,30,66,.04);
	}
	&:hover ${props => props.Icon ? props.Icon : null} {
		opacity: 1;
	}
`
const Label = styled.label`
	display: inline-flex;
	cursor: pointer;
	position: relative;
	margin-left: 4px;
	margin-top: ${props => props.Edit ? '10px' : null};
`;
const Container = styled.div`
	width: ${props => props.width ? props.width : null};
	display: ${props => props.display ? props.display : 'flex'};
	flex-direction: ${props => props.direction ? props.direction : 'row'};
	align-items: ${props => props.alignItems ? props.alignItems : 'center'};
	justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
	margin: ${props => props.margin ? props.margin : null};
	flex-grow: ${props => props.flexGrow ? props.flexGrow : null};
	background-color: ${props => props.bgColor ? props.bgColor : null};
`;
const Span = styled.span`
	margin-left: ${props => props.marginLeft ? props.marginLeft : null};
	text-decoration: ${props => props.Checked ? 'line-through' : null};
	display: flex;
	flex-grow: 1;
`;
const CheckBox = styled.input`
	-webkit-appearance: none;
	-moz-appearance: none;
	-o-appearance: none;
	appearance: none;
	outline: none;
	width: 16px;
	height: 16px;
	border: 2px solid #dfe1e6;
	cursor: pointer;
	&:checked {
		border: 2px solid #0079BF;
    background-color: #0079BF;
	}
	&:checked + ${Span} {
		&::before {
			content: "\\2713";
			display: block;
			text-align: center;
			font-weight: 300;
			font-size: 8px;
			color: #FFF;
			position: absolute;
			left: 7px;
			top: 1px;
		}
	}
`;
const Button = styled.button`
  background-color: ${props => props.bgColor ? props.bgColor : '#0079BF'};
  border-radius: 3px;
  border: none;
  color: #FFF;
  padding: 6px 12px 6px 12px;
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-right: ${props => props.marginRight ? props.marginRight : null};
  margin-top: ${props => props.marginTop ? props.marginTop : null};
  width: ${props => props.width ? props.width : null};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : '#156AA7'};
  }
`
const PanelComponent = ({propsObj, parentRef, close}) => {
  const { deleteToDo, transToCard } = propsObj;
  const btnProps = {width: '100%', marginTop: '15px', color: '#FFF'};
  const handleClick = (fnc) => {
    fnc();
    close();
  };
	//點擊其他地方可以關閉 Panel
  useEffect(() => {
    const onBodyClick = event => {
      //react v17 必須增加判斷 ref.current
      if(parentRef.current && !parentRef.current.contains(event.target)){
          close();
      }
    }
    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click',onBodyClick);
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  return(
    <div>
      <Button {...btnProps} onClick={() => handleClick(transToCard)}>轉換為卡片</Button>
		<Button onClick={() => handleClick(deleteToDo)} bgColor='#b04632' hoverColor='#933b27' {...btnProps}>刪除</Button>
    </div>
  )
}
const ListItem = ({ToDo, Listid, card, Icon ,isDragging}) => {
	const inputRef = useRef();
	const Ref = useRef();
	const [Checked, setChecked] = useState(false);                 //是否要顯示已完成
	const [Edit, setEdit] = useState(false);
	const [oriTitle, setoriTitle] = useState(ToDo.context);
  	const [newTitle, setnewTitle] = useState(ToDo.context);
	const {ToDoListContext_Obj} = useContext(ToDoListContext); //卡片的代辦清單
	const {CheckList, setCheckList} = ToDoListContext_Obj;
	const {paraObj} = useContext(ModifyContext);                   //卡片列表資料
	const { AllCardData, setAllCardData, ListID } = paraObj;       //卡片列表資料
	useEffect(() => {
		ToDo.done ? setChecked(true) : setChecked(false);
	},[ToDo]);
	useEffect(() => {
		if(inputRef.current){
			inputRef.current.selectionStart = newTitle.length;
			inputRef.current.focus();
		}
	},[Edit])// eslint-disable-line react-hooks/exhaustive-deps
	const CheckedChange = event => {
		//const doneStatus = !Checked;
		//setChecked(doneStatus);
		//更新context資料
		updateChecked(!Checked);
		//更新firebase
	}
	const updateChecked = (doneStatus) => {
		//一張卡片可能有多個list，找到現在卡片所屬的list
		let _ToDoList = JSON.parse(JSON.stringify(CheckList.find(List => List.id === Listid).ToDoList));
		let index = CheckList.findIndex(List => List.id === Listid);
		_ToDoList.every(element => {
      if(element.id === ToDo.id){
        element.done = doneStatus;
        return false;
      }
      return true;
    });
		let newState = JSON.parse(JSON.stringify(CheckList));
		newState[index].ToDoList = _ToDoList;
		setCheckList(newState);
		//更新firebase資料
    //更新firebase
    let docRef = db.collection('Card_ToDoList').doc(card.id);
    docRef.set({
      ListArray: newState
    });
	}
	const handleClick = () => {
		setEdit(true);
	}
  //修改待辦清單係向後按儲存
	const handleSave = () => {
		//一張卡片可能有多個list，找到現在卡片所屬的list
		let _List = JSON.parse(JSON.stringify(CheckList.find(List => List.id === Listid)));
    const ListIndex = CheckList.findIndex(List => List.id === Listid);
		_List.ToDoList.every(todo => {
      if(todo.id === ToDo.id){
        todo.context = newTitle;
        return false;
      }
      return true;
    });
		let newState = [...CheckList];
    newState[ListIndex] = _List;
    //更新 UIdata
    setCheckList(newState);
    //更新 firebase
    let docRef = db.collection('Card_ToDoList').doc(card.id);
    docRef.set({
      ListArray: newState
    });
    // 關閉輸入模式
		setoriTitle(newTitle);
		setEdit(false);
	}
	const handleClose = () => {
		setEdit(false);
		setnewTitle(oriTitle);
	}
	const IconClick = (ref, event) => {
		const client = ref.current.getBoundingClientRect();
		const Top = `${client.y + client.height + 6}px`; //加上padding才會對齊
    const Left = `${client.x}px`;               
    const width = '330px';         
    let _component = PanelComponent;
		//刪除待辦細項
		const deleteToDo = () => {
			let _List = JSON.parse(JSON.stringify(CheckList.find(List => List.id === Listid)));
			const ListIndex = CheckList.findIndex(List => List.id === Listid);
			const newToDoList = _List.ToDoList.filter(todo => todo.id !== ToDo.id);
			let newState = JSON.parse(JSON.stringify(CheckList));
			_List.ToDoList = newToDoList;
			newState[ListIndex] = _List;
			//更新 context
			setCheckList(newState);
			//更新 firebase
      let docRef = db.collection('Card_ToDoList').doc(card.id);
      docRef.set({
        ListArray: newState
      });
      console.log('delete success')
		}
		//待辦細項轉成卡片
		const transToCard = () => {
			const _list = AllCardData.lists[ListID];
			const newCardId = uuid();
			const newCard = {
				id: newCardId,
				context: newTitle
			};
			//list.cards = [...list.cards, newCard];
			_list.cards = _list.cards ? [..._list.cards, newCard] : [newCard];
			const newState = {
				...AllCardData,
				lists: {
					...AllCardData.lists,
					[ListID]: _list
				}
			};
			//更新context
      setAllCardData(newState);
      //更新 firebase
      let docRef = db.collection('Lists').doc(ListID);
      docRef.set({
        cards: _list.cards
      });
			deleteToDo();
		}
    const propsObj = {deleteToDo, transToCard};
    Panel.open({Top, Left, width, propsObj, component: _component, Title: '項目動作'});
		event.stopPropagation();
	}
	const handleChange = event => {
		setnewTitle(event.target.value)
	}
	const ContainerData = Edit ? (
    <InputArea
      inputRef={inputRef} 
      rows='2' 
      value={newTitle} 
      handle={{handleChange, handleSave, handleClose}}
      Icon={Icon} 
    />
	) : (
		<Span onClick={handleClick} IsChecked={Checked} >{ToDo.context}</Span>
	)
	const IconProps = {marginRight:'6px', opacity:'0', hover:true, display:Edit ? 'none' : null};
	return(
		<Wrapper Icon={Icon} isDragging={isDragging} alignItems={Edit ? 'flex-start' : null}>
			<Label Edit={Edit}>
				<CheckBox type="checkbox" onChange={CheckedChange} checked={Checked ? true : false} />
				<Span marginLeft='12px' />
			</Label>
			<Container width='100%' justifyContent={Edit ? 'flex-start' : null}>
				{ContainerData}
			</Container>
			<Icon ref={Ref} onClick={e => IconClick(Ref, e)} {...IconProps}>
				<MoreHorizIcon />
			</Icon>
		</Wrapper>
	)
}
export default ListItem;