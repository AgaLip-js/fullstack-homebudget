import {
  REMOVE_ITEM,
  EDIT_ITEM,
  ADD_ITEM,
  CLOSE_MODAL,
  OPEN_MODAL,
  LOADING_ITEM,
} from "./";
import axios from "axios";

export const openModal = (todo) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: {
      open: true,
      todo: todo,
    },
  });
};
export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
    payload: {
      open: false,
    },
  });
};

export const addItem = (description, user_id) => (dispatch) => {
  
  axios.post("/todos",
    {description: description, user_id: user_id}
  )
   .then(({data})=> {
     console.log(data);
    dispatch({
      type: ADD_ITEM,
      payload: {
        todo: data
      }
    });
    //  window.location = "/";
   })
   .catch((err) => {console.error(err.message);});
};
export const selectTodo = (user_id) => (dispatch) => {
  axios
    .get(`/todos/${user_id}`)
    .then(({ data }) => {
      dispatch({
        type: LOADING_ITEM,
        payload: {
          todos: data,
        },
      });
    })
    .catch((err) => {console.error(err.message);});
};
export const deleteTodo = (id) => (dispatch) => {
  axios
    .delete(`/todos/${id}`)
    .then((res) => {
      dispatch({
        type: REMOVE_ITEM,
        payload: {
          id
        }
      });
      // window.location = "/";
    })
    .catch((err) => {console.error(err.message);});
};
export const editTodo = (id, description)=> (dispatch) => {
  axios.put(`/todos/${id}`,  {description: description})
 .then(()=> {
  dispatch({
    type: EDIT_ITEM,
    payload: {
      todo: {id, description}
    }
  });
  // window.location = "/";
 })

.catch((err) => {console.error(err.message);});
};
