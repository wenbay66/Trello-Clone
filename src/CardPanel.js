import React from 'react';
import {render} from 'react-dom';
import styled from "styled-components";
const Wrapper = styled.div`
  display: ${props => props.active ? '' : 'none'};
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: ${props => props.Top ? props.Top : '0px'};
  left: ${props => props.Left ? props.Left : '0px'};
  width: ${props => props.width ? props.width : '0px'};
`
class CardPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = { active: false, Top: '0px', Left: '0px', width: '100%', TagData: {}, component: null };
    this.parentRef = React.createRef();
  }
    
  open = (para) => {//彈出層接收參數
    this.setState({active: true});
    const { paraObj, component } = para;
    const _key = new Date().getTime();
    //此時產生的 ＿component 才是可渲染的組件
    const _component = React.createElement(component,{
      key: _key,
      close:this.close,             //傳遞用來關閉彈出層的方法。
      parentRef: this.parentRef,    //click Panel 以外的地方也要關閉 Panel
      paraObj: paraObj
    })
    //更新 State
    this.setState({
      active: true,           //打開彈出層
      component: _component,  //打開彈出層時渲染的組件
    })
  }
  //關閉 Panel
  close = () => {
    this.setState({ active:false, component: null });
  }
    
  render(){
    return(
      <Wrapper active={this.state.active} Top={this.state.Top} Left={this.state.Left} width={this.state.width}>
          {this.state.component}
      </Wrapper>
    )
  }
  }
  //新增一個 div
  const _div = document.createElement('div');
  //將新增的 div 渲染到 UI
  document.body.appendChild(_div);
  //指定 _div 渲染 <CardPanel>
  const _CardPanel = render(<CardPanel />,_div);
  //導出
  export default _CardPanel;