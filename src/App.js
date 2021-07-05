import React,{useState, useEffect} from "react";
//component
import Header from "./Component/Header/Header";
import Container from './Container';
//import ListContainer from './Component/Card/ListContainer'

export const ThemeContext = React.createContext();

export default function App() {
  const [Theme, setTheme] = useState({type:'color', value:'#1A79BF'});
  const _Wrapper = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Theme.type === 'color' ? Theme.value : '',
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
        <Container />
      </div>
    </ThemeContext.Provider>
  );
}
