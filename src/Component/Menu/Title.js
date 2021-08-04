import React from 'react';
import styled from "styled-components";
//Icon
import CloseIcon from '@material-ui/icons/Close';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';

const Wrapper = styled.div`
    margin: 0px 8px 0px 8px;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #D5D9E0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative
`
const Icon = styled.div`
    position: absolute;
    right: ${props => props.right ? props.right : ''};
    left: ${props => props.left ? props.left : ''};
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    &:hover{
        cursor: pointer
    }
`
export default function Title({handleClose, GoBack, ComponentList}){
    return(
        <Wrapper>
            {ComponentList.length > 0 ? (
                <Icon left='0' onClick={GoBack}>
                    <NavigateBeforeOutlinedIcon />
                </Icon>
            ) : ('')}
            {ComponentList.length === 0 ? '選單' : ComponentList[ComponentList.length - 1].title}
            <Icon right='0' onClick={handleClose}>
                <CloseIcon />
            </Icon>
        </Wrapper>
    )
}