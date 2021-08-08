import React, {useState, useEffect, useContext, useRef} from 'react';
import styled,{keyframes} from "styled-components";
//context
import {TagContext} from '../../Container';
import {AllCardContext} from '../../Container';
//icon
import CheckIcon from '@material-ui/icons/Check';
const animat = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0%;
  }
`;
const Wrapper = styled.div`
  dislay: flex;
  flex-direction: column;
  padding: 0px 6px 0px 0px;
  width: 100%;
  position:relative;
  animation: ${animat} .1s ease-in;
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
const Text = styled.p`
  color: rgb(94, 108, 132);
  font-size: 14px;
  font-weight: 400;
  padding-left: 8px;
`
const Hr = styled.div`
  border-bottom: 1px solid #D5D9E0;
  margin-top: 10px;
  margin-bottom: 10px;
`
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4px;
`
const TagBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgb(9, 30, 66);
  cursor: pointer;
  font-size: 14px;
  font-width: 400;
  padding: 4px;
  &:hover{
    background-color: #eaecf0
  }
  position: relative;
`
const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: ${props => props.color ? props.color : null};
`
const Icon = styled.div`
  display: ${props => props.show === true ? '' : 'none'};
  position: absolute;
  right:4px;
`
export default function SearchCard(){
  const inputRef = useRef();
  const {TagContext_Obj} = useContext(TagContext);
  const {AllTagData} = TagContext_Obj;
  const {searchTag, setsearchTag, searchText, setsearchText} = useContext(AllCardContext);
  const [textValue, settextValue] = useState(searchText);
  
  //設定是否搜尋含有目標標籤的卡片
  const toggleSearch = tagID => {
    let _searchTag = [...searchTag];
    if(_searchTag.includes(tagID)){
      _searchTag = _searchTag.filter(item => item !== tagID);
    }else{
      _searchTag.push(tagID);
    };
    setsearchTag(_searchTag);
  };
  const handleChange = event => {
    settextValue(event.target.value)
  };
  //改變搜尋改卡片的關鍵字
  useEffect(() => {
    const callBack = () => {
      //if(textValue === '') return;
      setsearchText(textValue);
    }
    //search after .5s beacuse efficient
    const timeoutID = setTimeout( () => { 
      callBack();
    }, 500);
    return () => {
      clearTimeout(timeoutID)
    }
  },[textValue])// eslint-disable-line react-hooks/exhaustive-deps
  const tagData = AllTagData.map(tagData => {
    //是否顯示勾勾
    const show = searchTag.includes(tagData.tagID) ? true : false;
    return (
      <TagBox key={tagData.tagID} onClick={() => toggleSearch(tagData.tagID)}>
        <ColorBox color={tagData.bgColor} />
        {tagData.tagName}
        <Icon show={show}>
          <CheckIcon fontSize='small'/>
        </Icon>
      </TagBox>
    );
  });
  return(
    <Wrapper>
      <SearchBox value={textValue} onChange={handleChange} ref={inputRef} />
      <Text>依字詞、標籤開始搜尋。</Text>
      <Hr />
      <TagContainer>
        {tagData}
      </TagContainer>
    </Wrapper>
  )
}