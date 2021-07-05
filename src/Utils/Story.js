import axios from 'axios';
const cards = [
  {
    id: "card-1",
    context: "Learn react hook"
  },
  {
    id: "card-2",
    context: "making product",
    tagID: 'tag-4'
  },
  {
    id: "card-3",
    context: "Takeing you out"
  }
];
//卡片詳細資料
const cardDta = {
  'card-4': {
    description: '我是測試描述1',
    todoList: [
      {
        todo: '事情1',
        done: true,
      },
      {
        todo: '事情2',
        done: false
      }
    ]
  },
  'card-5': {
    description: '我是測試描述2',
    todoList: [
      {
        todo: '事情1',
        done: true,
      },
      {
        todo: '事情2',
        done: true
      }
    ]
  }
}
const data = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "TODO",
      cards
    },
    "list-2": {
      id: "list-2",
      title: "DOING",
      cards: [
        {
          id: "card_4",
          context: "clone product",
          tagID: "tag-1"
        },
        {
          id: "card-5",
          context: "this is MIT",
          tagID: "tag-2"
        },
        {
          id: "card-6",
          context: "test6",
          tagID: "tag-2"
        },
        {
          id: "card-7",
          context: "test7",
          tagID: "tag-2"
        },
        {
          id: "card-8",
          context: "test8",
          tagID: "tag-2"
        },
        {
          id: "card-9",
          context: "test9",
          tagID: "tag-2"
        },
        {
          id: "card-10",
          context: "test10",
          tagID: "tag-2"
        }
      ]
    }
  },
  listIds: ["list-1", "list-2"]
};

/*const TagData = async () => {
  return await axios.get(`https://api.github.com/users/wenbay66`).then(res => {
    return res.data
  })
}*/

export const tagData = async () => {
  let response;
  try{
    response = await axios.get('https://api.github.com/users/wenbay66').then(res => res.data)
  }catch (e){
    throw new Error(e.message)
  }
  return response ? response.data : null // or set initial value
}

export {cards};
export default data;
