import React,{useState, useEffect} from "react";
//component
import {OpenContext} from "./Context/OpenContext";
import Header from "./Component/Header/Header";
import Wrapper from "./Component/List/Wrapper";
import TopBar from "./Component/TopBar/TopBar";
import Menu from "./Component/Menu/Menu";

export const ThemeContext = React.createContext();

export default function App() {
  const [isOpen, setisOpen] = useState(true);
  const [Theme, setTheme] = useState({type:'color', value:'#1A79BF'});
  const _style_L = {
    width: isOpen ? '80%' : '100%',
    height: '100%',
    transition:'width .1s ease-in',
  }
  const _style_R = {
    width:isOpen ? '20%' : '0%',
    position:'relative',
    transition:'width .1s ease-in',
    height:'100%'
  }
  const _Wrapper = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Theme.type === 'color' ? Theme.value : '',
  }
  const _Container = {
    display: 'flex',
    height: 'calc(100% - 40px)'
  }
  const CheseTheme = (type, value) => {
    setTheme({type, value});
  } 
  useEffect(() => {
    console.log('app init-render')
  }, []);
  return (
    <ThemeContext.Provider value={{Theme, CheseTheme}}>
      <div style={_Wrapper}>
        <Header Theme={Theme} />
        <div style={_Container}>
          <OpenContext.Provider value={{isOpen, setisOpen}}>
            <div style={_style_L}>
              <TopBar />
              <Wrapper />
            </div>
            <div style={_style_R}>
              {isOpen ? <Menu isOpen={isOpen} handleClose={() => setisOpen(false)} /> : ''}
            </div>
          </OpenContext.Provider>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
