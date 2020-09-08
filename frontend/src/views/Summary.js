import React, { useState, useEffect } from "react";
import UserPageTemplate from "../templates/UserPageTemplate";
import Sidebar from "../components/Sidebar/Sidebar";
import styled from "styled-components";
import EditTodo from "../components/EditTodo";
import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store/store";
import { loadUser } from "../redux/actions/authActions";
import { addItem, selectTodo, deleteTodo } from "../redux/actions/itemsActions";


const StyledWelcomeTitle = styled.h2`
text-align: center;
`

const StyledForm = styled.form``;
const StyledInput = styled.input``;

const StyledTable = styled.table`
  display: grid;
  justify-content: center;
  margin: 20px;
  grid-template-rows: repeat(2, auto);
`;
const StyledTHead = styled.thead``;
const StyledTr = styled.tr`
  grid-template-columns: repeat(3, 100px);
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledButton = styled.button`
  background: red;
  color: white;
`;
const StyledTh = styled.th``;
const StyledTBody = styled.tbody``;

const Summary = () => {
  const { auth } = useSelector((store) => ({
    auth: store.auth,
  }));
  const {items} = useSelector((store) => ({
    items: store.items,
  }));
  const {todos} = useSelector(({items}) => ({
    todos: items.todos,
  }));
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();
    store.dispatch(addItem(description, auth.user.id));
    setDescription("");
  }


  return (
    <>
      <UserPageTemplate pageContext="summary">
        <StyledForm onSubmit={onSubmitForm}>
          <StyledInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
          <StyledButton>Add</StyledButton>
        </StyledForm>
        <StyledTable>
          <StyledTHead>
            <StyledTr>
              <StyledTh>Description</StyledTh>
              <StyledTh>Edit</StyledTh>
              <StyledTh>Delete</StyledTh>
            </StyledTr>
          </StyledTHead>
          <StyledTBody>
              {todos.map((todo) => (
                <StyledTr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>
                    <EditTodo todo={todo} />
                  </td>
                  <td>
                    <StyledButton onClick={() => dispatch(deleteTodo(todo.id))}>
                      Delete
                    </StyledButton>
                  </td>
                </StyledTr>
              ))}
            
          </StyledTBody>
        </StyledTable>
      </UserPageTemplate>

  </>
  );
};

export default Summary;
