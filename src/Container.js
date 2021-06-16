import React,{useState, useEffect} from 'react';
//Component
import Wrapper from "./Component/List/Wrapper";
import TopBar from "./Component/TopBar/TopBar";
import Menu from "./Component/Menu/Menu";
//API
//import db from '../src/API';
export const OpenContext = React.createContext();

const Container = () => {
  const [isOpen, setisOpen] = useState(true);
  const [AllTagData, setAllTagData] = useState(null);   //標籤資料
  const [ShowMode, setShowMode] = useState(true); //標籤顯示模式
  //const [dc, setdc] = useState(null);
  //切換標籤 精簡、複雜 模式
  //const ToggleShowMode = () => {
    //setShowMode(false)
  //}
  //之後要改成串接firebase API
  useEffect(() => {
    const TestTagData = [
      {
        tagID: 'tag-1',
        tagName: 'Node.js',
        bgColor: '#61BD50'
      },
      {
        tagID: 'tag-2',
        tagName: 'JavaScript',
        bgColor: '#F2D600'
      },
      {
        tagID: 'tag-3',
        tagName: '工具類',
        bgColor: '#FB9F1A'
      },
      {
        tagID: 'tag-4',
        tagName: '其他',
        bgColor: '#EB5A46'
      },
      {
        tagID: 'tag-5',
        tagName: 'React',
        bgColor: '#1A79BF'
      },
      {
        tagID: 'xxx',
        tagName: 'Vue.js',
        bgColor: '#61BD50'
      }
    ]
    setAllTagData(TestTagData)
  },[])
  /*useEffect(() => {
    async function getData(){
      await db.collection('Tag')
      .where('tagName', '==', 'Node.js')
      .where('is', '==', true)
      .get()
      .then(res => setdc(res))
    }
    getData();
  },[])*/
  const _Container = {
    display: 'flex',
    height: 'calc(100% - 40px)'
  }
  const _Left = {
    width: isOpen ? '80%' : '100%',
    height: '100%',
    transition: 'width .1s ease-in',
  }
  const _Right = {
    width: isOpen ? '20%' : '0%',
    position: 'relative',
    transition: 'width .1s ease-in',
    height: '100%'
  }
  /*const test = () => {
    let docs = dc.docs.map(element => {
      return element.data()
    });
    let doc = dc.docs.find(element => {
      return element.data()
    })
    console.log(docs)
  }*/
  return(
    <div style={_Container}>
      <OpenContext.Provider value={{isOpen, setisOpen}}>
        <TagContext.Provider value={{AllTagData, setAllTagData, ShowMode, setShowMode}}>
          <div style={_Left}>
            <TopBar />
            <Wrapper />
          </div>
          <div style={_Right}>
            {isOpen ? <Menu isOpen={isOpen} handleClose={() => setisOpen(false)} /> : ''}
          </div>
        </TagContext.Provider>
      </OpenContext.Provider>
    </div>
  )
}
export const TagContext = React.createContext();
export default Container;