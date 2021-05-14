const cards = [
  {
    id: "card-1",
    context: "Learn react hook"
  },
  {
    id: "card-2",
    context: "making product"
  },
  {
    id: "card-3",
    context: "Takeing you out"
  }
];
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
          id: "card-4",
          context: "clone product"
        },
        {
          id: "card-5",
          context: "this is MIT"
        }
      ]
    }
  },
  listIds: ["list-1", "list-2"]
};
export default data;
