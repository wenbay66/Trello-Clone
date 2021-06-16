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
const Tag = ({data, openPanel}) => {
    const Ref = useRef();
    const handleClick = (event) => {
        const client = Ref.current.getBoundingClientRect();
        //top、left、width、tagName
        const Top = client.y + client.height + 2; //需加上Tag的高度這樣才會位置才會在標籤正下方，再加2會比較好看
        const Left = client.x + 16;               //加上半個 icon 的寬度比較好看
        const width = client.width - 16;          //需扣掉半個 icon 寬度
        const tagData = {
           tagID: data.tagID,
           tagName: data.tagName,
           bgColor: data.bgColor
        }
        openPanel(Top, Left, width, tagData);
    }
    return(
        <Wrapper ref={Ref} onClick={handleClick}>
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