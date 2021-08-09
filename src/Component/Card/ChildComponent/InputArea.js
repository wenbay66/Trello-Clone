import React, {useEffect} from 'react';
import styled from "styled-components";
//icon
import CloseIcon from '@material-ui/icons/Close';
const Wrapper = styled.div`
	width: ${props => props.width ? props.width : null};
	display: ${props => props.display ? props.display : 'flex'};
	flex-direction: ${props => props.direction ? props.direction : 'row'};
	align-items: ${props => props.alignItems ? props.alignItems : 'center'};
	justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
	margin: ${props => props.margin ? props.margin : null};
	flex-grow: ${props => props.flexGrow ? props.flexGrow : null};
	background-color: ${props => props.bgColor ? props.bgColor : null};
`;
const Textarea = styled.textarea`
  color: #172b4d;
  width: 100%;
  border:  ${props => props.create ? '2px solid #0079BF' : '1px solid rgba(9,30,66,.13)'};
  background: ${props => props.create ? '#FFF' : 'rgba(9,30,66,.04)'};
  outline: none;
  resize: none;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 8px 12px 8px 12px;
`
const Container = styled(Wrapper)`

`
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
const InputArea = ({Icon, inputRef, value, rows, create, placeholder, handle}) => {
  /** inputRef可提供可不提供 **/
  const {handleChange, handleSave, handleClose} = handle;
  useEffect(() => {
		if(inputRef.current){
			inputRef.current.focus();
		}
	})
  const handleKeyDown = event => {
    if(event.keyCode === 13){
      handleSave();
    }
  }
  return(
    <Wrapper width='100%' direction='column' alignItems='flex-start'>
      <Textarea rows={rows} ref={inputRef} placeholder={placeholder} value={value} onKeyDown={handleKeyDown} onChange={handleChange} create={create} />
      <Container margin='5px 0 0 0'>
        <Button onClick={handleSave}>儲存</Button>
        <Icon cursor='pointer' onClick={handleClose}>
          <CloseIcon fontSize='large' />
        </Icon>
      </Container>
    </Wrapper>
  )
}
export default InputArea;