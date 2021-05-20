import React from 'react';
import styled from "styled-components";
//component
import Btn from "../Btn/Btn"
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

const Container = styled.div`
    max-height: 34px;
    min-height: 34px;
    background: rgb(1,121,191);
    padding: 4px;
    display: flex;
    align-items: center;
`
const TitleBtn = styled.span`
    font-weight: 700;
    font-size: 18px;
    margin-left: 6px;
    margin-right: 6px;
` 
const Border = styled.span`
    border-left-color: rgba(255, 255, 255, 0.24);
    border-left-style: solid;
    border-left-width: 1px;
    height: 16px;
    margin-left: 8px;
    margin-right: 8px
`

export default function TopBar(){
    const ccc = ()=>{
        alert('123')
    }
    return (
        <>
            <Container>
                <span onClick={ccc}>
                    <Btn>
                        <FormatListBulletedRoundedIcon style={{fontSize:14}}/>
                        <span>看板</span>
                        <KeyboardArrowDownRoundedIcon/>
                    </Btn>
                </span>
                <span onClick={ccc} style={{marginLeft:'4px'}}>
                    <Btn>
                        <TitleBtn>程式roadMap</TitleBtn>
                    </Btn>
                </span>
                <span style={{marginLeft:'4px'}}>
                    <Btn>
                        <StarBorderOutlinedIcon />
                    </Btn>
                </span>
                <Border />
            </Container>
        </>
    )
}