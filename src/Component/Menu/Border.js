import React from 'react';
import styled,{keyframes} from "styled-components";
//icon
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SubjectIcon from '@material-ui/icons/Subject';

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
  padding: 0px 6px 0px 6px;
  width: 100%;
  position:relative;
  animation: ${animat} .1s ease-in;
`
const Header = styled.div`
  display: flex;
  align-items: center;
`
const H3 = styled.h3`
  margin-left: 10px;
  color: rgb(23, 43, 77);
  font-size: 16px;
  font-weight: 600
`
const Context = styled.div`
  display: flex;
  flex-direction: column
`
export default function Border(){
    return(
        <Wrapper>
            <Header>
                <PersonOutlineOutlinedIcon style={{fontSize:32}}/>
                <H3>看板管理員</H3>
            </Header>
            <Context>
                <Header>
                    <SubjectIcon style={{fontSize:32}} />
                    <H3>描述</H3>
                </Header>
            </Context>
        </Wrapper>
    )
}