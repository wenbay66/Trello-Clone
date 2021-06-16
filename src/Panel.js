import React from 'react';
import {render} from 'react-dom';
import styled from "styled-components";
//icon
import CloseIcon from '@material-ui/icons/Close';
const Wrapper = styled.div`
    display: ${props => props.active ? 'block' : 'none'};
    position: absolute;
    top: ${props => props.Top ? props.Top : '0px'};
    left: ${props => props.Left ? props.Left : '0px'};
    width: ${props => props.width ? props.width : '0px'};
    background-color: #FFF;
    border-radius: 3px;
    box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
`
const Header = styled.div`
    display: flex;
    flex-direction: row;
`
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  color: #5e6c84;
`
const Icon = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 20px;
  height: 20px;
  padding: 10px 8px 10px 8px;
  color: #5e6c84;
  cursor: pointer;
`
const Hr = styled.div`
  border-bottom: 1px solid #D5D9E0;
  margin: 0px 10px 0px 10px;
`
const Container = styled.div`
  padding: 10px
`
class Panel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      Top: '0',
      Left: '0',
      tagData: {},
      component: null
    };
    this.parentRef = React.createRef();
  }
  
  open = (para) => {//彈出層接收參數
    const { Top, Left, width, tagData ,AllTagData ,setAllTagData ,component } = para;  //此時component取得的會是'構造函數(Constructor)'
    const _key = new Date().getTime();
    //此時產生的 ＿component 才是可渲染的組件
    const _component = React.createElement(component,{
       key: _key,
       close:this.close,             //傳遞用來關閉彈出層的方法。
       parentRef: this.parentRef,    //click Panel 以外的地方也要關閉 Panel
       tagData: tagData,             //對畫框中顯示用
       AllTagData: AllTagData,       //所有標籤的 json format
       setAllTagData: setAllTagData  //修改標籤資料的方法
    })
    this.setState({
      active:true,//打開彈出層
      Top: `${Top}px`,
      Left: `${Left}px`,
      width: `${width}px`,
      tagData: tagData,
      component:_component,//打開彈出層時渲染的組件
    })
  }
  //關閉 Panel
  close = () => {
    this.setState({ active:false, component: null });
  }
  
  render(){
    return(
      <Wrapper ref={this.parentRef} active={this.state.active} Top={this.state.Top} Left={this.state.Left} width={this.state.width}>
        <Header>
          <Title>{this.state.tagData === null ? '新增標籤' : '改變標籤'}</Title>
          <Icon onClick={this.close}><CloseIcon /></Icon>
        </Header>  
        <Hr />
        <Container>
          {this.state.component}
        </Container>
      </Wrapper>
    )
  }
}
//新增一個 div
const _div = document.createElement('div');
//將新增的 div 渲染到 UI
document.body.appendChild(_div);
//指定 _div 渲染 <Panel>
const _Panel = render(<Panel />,_div);
//導出
export default _Panel;