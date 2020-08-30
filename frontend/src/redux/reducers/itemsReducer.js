import {
OPEN_MODAL,
CLOSE_MODAL,
ADD_ITEM,
EDIT_ITEM,
REMOVE_ITEM,
LOADING_ITEM,
CLEAR_STATE
} from "../actions";

const initialState = {
    open: false,
    todos: [],
    todo: "",
    isLoading: true,
  };
  const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_ITEM:
            return {
              ...state,
              isLoading: false,
              todos: action.payload.todos,
            };
        case OPEN_MODAL: {
            return {
              ...state,
              open: action.payload.open,
              todo: action.payload.todo,
            };
          }
          case CLOSE_MODAL: {
            return {
              ...state,
              open: action.payload.open,
            };
          }
          case ADD_ITEM: {
            return {
              ...state,
              todos: [...state.todos, action.payload.todo],
            };
          }
          case EDIT_ITEM: {
            return {
              ...state,
              todos: state.todos.map((todo) => {
                if (todo.id === action.payload.todo.id)
                  return action.payload.todo;
      
                return todo;
              }),
            };
          }
          case REMOVE_ITEM: {
            return {
              ...state,
              todos: state.todos.filter((todo) => {
                if (todo.id !== action.payload.id) {
                  return todo;
                }
              }),
            };
          }
          case CLEAR_STATE :{
            return initialState;
          }
          default:
            return state;
        
    }}
    export default itemsReducer;