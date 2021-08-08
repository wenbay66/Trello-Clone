import React,{useState, useEffect} from 'react';
import styled from "styled-components";
//Component
import Wrapper from "./Component/List/Wrapper";
import TopBar from "./Component/TopBar/TopBar";
import Menu from "./Component/Menu/Menu";
//API
import db, {update} from './API';
import { v4 as uuid } from "uuid";
export const OpenContext = React.createContext();
export const TagContext = React.createContext();
export const AllCardContext = React.createContext();
const WrapperContainer = styled.div`
  display: flex;
  height: calc(100% - 40px);
`
const LeftContainer = styled.div`
  width: ${props => props.isOpen ? '80%' : '100%'};
  height: 100%;
  transition: width .1s ease-in
`
const RightContainer = styled.div`
  z-index: 10;
  width: ${props => props.isOpen ? '20%' : '0%'};
  position: relative;
  transition: width .1s ease-in;
  height: 100%;
`
const Container = () => {
  const [isOpen, setisOpen] = useState(true);
  const [AllCardData, setAllCardData] = useState(null);  //所有卡片資料
  const [searchTag, setsearchTag] = useState([]);        //搜尋卡片時使用
  const [searchText, setsearchText] = useState('')       //搜尋卡片時使用
  const [AllTagData, setAllTagData] = useState(null);    //標籤資料
  const [ShowMode, setShowMode] = useState(true);        //標籤顯示模式
  
  //TagData firebase API
  useEffect(() => {
    async function getData(){
      let TagDatas = await db.collection('Tag').get().then(dc => {
        return dc.docs.map(doc => {
          const tagObj = Object.assign({}, doc.data(), {'tagID': doc.id});
          return tagObj;
        })
      });
      setAllTagData(TagDatas);
    }
    getData();
  },[]);
  //卡片資料 firebase api
  useEffect(() => {
    async function getData(){
      await db.collection('Lists').get().then(Lists => {
        //取得所有列表的id, 方便之後更新api
        const listIds = Lists.docs.map(List => List.id);
        //所有列表的資料
        const lists = Lists.docs.reduce((Previous, Current) => {
          Previous[Current.id] = Object.assign({}, Current.data(), {id: Current.id});
          return Previous;
        }, {});
        const state = {listIds, lists};
        setAllCardData(state)
      })
    }
    getData();
  },[])
  //新增卡片
  const AddNewCard = (title, listid) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      context: title
    };
    const list = AllCardData.lists[listid];
    list.cards = list.cards ? [...list.cards, newCard] : [newCard];
    const newState = {
      ...AllCardData,
      lists: {
        ...AllCardData.lists,
        [listid]: list
      }
    };
    //更新新增的卡片到 firebase
    let docRef = db.collection('Lists').doc(listid);
    docRef.update({
      cards: update.FieldValue.arrayUnion(newCard)
    });
    //更新UI畫面
    setAllCardData(newState);
  };
  //新增列表
  const AddNewList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: []
    };
    const newState = {
      listIds: [...AllCardData.listIds, newListId],
      lists: {
        ...AllCardData.lists,
        [newListId]: newList
      }
    };
    //更新新增的列表到 firebase
    let docRef = db.collection('Lists').doc(newListId);
    docRef.set({
      title
    });
    //更新UI畫面
    setAllCardData(newState);
  };
  //更新卡片名稱
  const UpdateCardContext = (NewCardContext, ListID, card) => {
    //更新 UI data
    const cards = AllCardData.lists[ListID].cards; //卡片所屬的列表所有資料 => AllCardData.lists[ListID];
    //step1 複製出列表下所有卡片資料
    const _cards = JSON.parse(JSON.stringify(cards));
    //step2 修改要更改的卡片
    _cards.every(element => {
      if(element.id === card.id){
        element.context = NewCardContext;
        return false;
      }
      return true;
    });
    //step3 產生新的所有列表資料
    let _lists = {
      ...AllCardData.lists,
      [ListID]: {
        ...AllCardData.lists[ListID],
        cards: _cards
      }
    }
    //新的UI data
    let newData = {
      listIds: [...AllCardData.listIds],
      lists: _lists
    }
    //更新context資料
    setAllCardData(newData)
    //更新firebase資料
    let docRef = db.collection('Lists').doc(ListID);
    docRef.update({
      cards: _cards
    })
  };
  //更新列表名稱
  const UpDateTitle = (NewTitle, listid) => {
    const newList = AllCardData.lists[listid];
    newList.title = NewTitle;
    const newState = {
      listIds: [...AllCardData.listIds],
      lists: {
        ...AllCardData.lists,
        [listid]: newList
      }
    };
    //更新新的列表名稱到firebase
    let docRef = db.collection('Lists').doc(listid);
    docRef.update({
      title: NewTitle
    });
    //更新UI畫面
    setAllCardData(newState);
  };
  
  const TagContext_Obj = {AllTagData, setAllTagData, ShowMode, setShowMode};
  const CardContext_Obj = {
    'AllCardData': AllCardData,
    'setAllCardData': setAllCardData,
    'searchText': searchText,
    'setsearchText': setsearchText,
    'searchTag': searchTag,
    'setsearchTag': setsearchTag,
    'AddNewCard': AddNewCard,
    'AddNewList': AddNewList,
    'UpDateTitle': UpDateTitle,
    'UpdateCardContext': UpdateCardContext,
  };
  console.log('searchTag = ', searchTag);
  console.log('searchText = ', searchText)
  return(
    <WrapperContainer>
      <OpenContext.Provider value={{isOpen, setisOpen}}>
        <TagContext.Provider value={{TagContext_Obj}}>
          <AllCardContext.Provider value={CardContext_Obj}>
            <LeftContainer isOpen={isOpen}>
              <TopBar />
              <Wrapper />
            </LeftContainer>
            <RightContainer isOpen={isOpen}>
              {isOpen ? (
                <Menu isOpen={isOpen} handleClose={() => setisOpen(false)} />
              ) : null}
            </RightContainer>
          </AllCardContext.Provider>
        </TagContext.Provider>
      </OpenContext.Provider>
    </WrapperContainer>
  )
}

export default Container;