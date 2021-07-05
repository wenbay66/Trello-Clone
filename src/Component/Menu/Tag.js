import React,{ useRef } from 'react';
import styled from "styled-components";
//icon
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 3px;
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  color: #fff
`
const Container = styled.div`
    padding: 6px 12px 6px 12px;
    background-color: ${props => props.bgColor ? props.bgColor : ''};
    border-radius: 3px;
    cursor: pointer;
    flex-grow: 1;
    border-left: 0px solid rgba(0, 0, 0, .2);
    transition: padding-left,border-left .3s;
    &:hover{
        border-left: 10px solid rgba(0, 0, 0, .2);
        padding-left: 20px
    }
`
const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    width: 32px;
    height: 32px;
    margin-left: 4px;
    color: #5e6c84;
    border-radius: 3px;
    cursor: pointer;
    :hover{
        background-color: rgba(9, 30, 66, .08)
    }
`
//負責顯示用，click時回傳 client位置
const Tag = ({data, dataIndex, fnc}) => {
    const Ref = useRef();
    return(
        <Wrapper ref={Ref} onClick={() => fnc(Ref.current.getBoundingClientRect(), dataIndex)}>
            <Container bgColor={data.bgColor}>
                {data.tagName}
            </Container>
            <Icon>
                <CreateOutlinedIcon style={{fontSize: '18px'}} />
            </Icon>
        </Wrapper>
    )
}
export default Tag;