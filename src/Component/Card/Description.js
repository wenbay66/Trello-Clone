import React,{ useState, useEffect, useRef } from 'react';
import styled from "styled-components";
//api
import db, { update } from '../../API';
//icon
import SubjectIcon from '@material-ui/icons/Subject';
import CloseIcon from '@material-ui/icons/Close';
const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: #172b4d;
  font-weight: 600;
  font-size: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
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
  cursor: pointer;
  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : '#E2E4E9'};
  }
`
const Span = styled.span`
  height: ${props => props.height ? props.height : null};
  line-height: ${props => props.lineHeight ? props.lineHeight : null};
`
const Container = styled.div`
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-top: ${props => props.marginTop ? props.marginTop : null};
  display: ${props => props.display ? props.display : null};
  flex-direction: ${props => props.direction ? props.direction : null};
  justify-content: ${props => props.justifyContent ? props.justifyContent : null};
  align-items: ${props => props.alignItems ? props.alignItems : null};
`
const Textarea = styled.textarea`
  width: 100%;
  border: 2px solid #F4F5F7;
  outline: none;
  resize: none;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 8px 12px 8px 12px;
  background-color: ${props => props.Edit ? '#FFF' : 'rgba(9,30,66,.04)'};
  cursor: pointer;
  overflow-wrap: break-word;
  font-size: 14px;
  line-height: 20px;
  &:focus {
    background-color: #FFF;
    border: 2px solid #0079bf;
    &:hover {
      background-color: #FFF;
      cursor: auto;
    }
  }
  &:hover {
    background-color: ${props => props.Edit ? '#FFF' : '#e2e4e9'};
  }

`
const Footer = styled.div`
  display: ${props => props.Edit ? 'flex' : 'none'};
  margin-left: ${props => props.marginLeft ? props.marginLeft : null};
  margin-top: ${props => props.marginTop ? props.marginTop : null};
  flex-direction: ${props => props.direction ? props.direction : null};
  justify-content: ${props => props.justifyContent ? props.justifyContent : null};
  align-items: ${props => props.alignItems ? props.alignItems : null};
`
const Description = ({ Icon, card }) => {
  const inputRef = useRef();
  const [Edit, setEdit] = useState(false);
  const [Value, setValue] = useState('');
  //click 關閉或 unBlur 時使用
  const [OriValue, setOriValue] = useState('');
  //點擊儲存
  const handleClick = () => {
    //1. 關閉編輯模式
    setEdit(false);
    //2. 如果Value跟編輯前的資料一樣就不要繼續往下跑了
    if(Value === OriValue) return;
    //3. 更新oriValue
    setOriValue(Value);
    //4. 更新firebase
    let docRef = db.collection('Card_Description').doc(card.id);
    docRef.set({
      Description: Value
    });
    console.log(Value)
  }
  const handleClose = () => {
    setEdit(false);
    setValue(OriValue);
  }
  const handleChange = (e) => {
    //計算出textarea的rows需要多少
    getRows(e.target);
    setValue(e.target.value);
  }
  /*const handleBlur = () => {
    setEdit(false);
  }*/
  //動態計算TextArea需要幾個row
  const getRows = event => {
    const textareaLineHeight = 20; //根據css line height 設定
    const minRow = 3;
    event.rows = minRow; //避免回車時scrollHeight沒有重算
    const currentRows = ~~(event.scrollHeight / textareaLineHeight);
    event.rows = currentRows;
  }
  //init render call api 用card.id看有沒有資料
  useEffect(() => {
    async function getData(){
      let docRef = await db.collection('Card_Description').doc(card.id);
      let Obj = await docRef.get().then(doc => doc.exists ? doc.data() : null);
      if(Obj !== null){
        setValue(Obj.Description);
        setOriValue(Obj.Description);
      }
    }
    //getData();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  //剛進入編輯模式時計算需要多少row
  useEffect(() => {
    if(Edit === false) return;
    if(inputRef.current){
      inputRef.current.focus();
      getRows(inputRef.current);
    }
  }, [Edit]);
  //不是編輯狀態且value不是空
  const UIdata = (Edit === false && Value !== '') ? (
    <div 
      onClick={() => setEdit(true)}
      dangerouslySetInnerHTML={{ __html: Value.replaceAll('\n', '<br />') }} 
      style={{cursor: 'pointer'}}
    />
  ) : (
    <Textarea
      ref={inputRef}
      Edit={Edit}
      value={Value}
      onChange={handleChange}
      onClick={() => setEdit(true)}
      placeholder='新增更詳細的敘述...'
    />
  );
  //props
  const _Footer = {marginLeft:'40px', marginTop:'5px', direction:'row', justifyContent:'space-between', alignItems:'center'};
  const _Footer_Container = {display:'flex', direction:'row', alignItems:'center'};
  return(
    <Wrapper>
      <Title>
        <Icon marginRight='8px'>
          <SubjectIcon />
        </Icon>
        <Span height='32px' lineHeight='32px'>描述</Span>
        <Button onClick={() => setEdit(true)} Edit={Edit} marginLeft='12px'>編輯</Button>
      </Title>
      <Container marginLeft='40px' marginTop='5px'>
        {UIdata}
      </Container>
      <Footer Edit={Edit} {..._Footer} >
        <Container {..._Footer_Container} >
          <Button bgColor='#0079BF' hoverColor='#156AA7' color='white' marginRight='5px' onClick={handleClick}>儲存</Button>
          <CloseIcon style={{fontSize: 32,cursor:'pointer'}} onClick={handleClose}/>
        </Container>
      </Footer>
    </Wrapper>
  )
}
export default Description;