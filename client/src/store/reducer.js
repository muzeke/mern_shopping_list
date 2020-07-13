import { v4 as uuid } from "uuid";
const initialState = {
  items: [
    {
      id: uuid(),
      name: "EGSS",
    },
    {
      id: uuid(),
      name: "Milk's",
    },
    {
      id: uuid(),
      name: "Water",
    },
  ],
  todo: ["Abc", "Def"],
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "ADD_TODO":
      newState.todo = [...newState.todo, action.text];
      console.log(newState);
      break;
  }
  return newState;
};

export default reducer;
