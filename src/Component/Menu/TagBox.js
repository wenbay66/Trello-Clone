import React from 'react';
import styled from "styled-components";
//icon
import CheckIcon from '@material-ui/icons/Check';
const BoxWrapper = styled.span`
  display: block;
  background-color: ${props => props.bgColor ? props.bgColor : null};
  margin: 0px 0px 5px 5px;
  border-radius: 4px;
  float: left;
  height: 32px;
  width: 48px;
  cursor: pointer;
  position: relative;
`
const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  color: #fff;
`
const TagBox = ({bgColor, isShow, setTagColor}) => {
    return(
        <BoxWrapper bgColor={bgColor} onClick={() => setTagColor(bgColor)}>
            <Icon>
                {isShow ? <CheckIcon style={{fontSize:'14px'}} /> : null}
            </Icon>
        </BoxWrapper>
    )
}
export default TagBox;