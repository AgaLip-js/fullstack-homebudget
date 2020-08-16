import React, { useState, useEffect } from "react";
import UserPageTemplate from "../templates/UserPageTemplate";
import Sidebar from "../components/Sidebar/Sidebar";
import styled from "styled-components";
import EditTodo from "../components/EditTodo";
import { useSelector } from "react-redux";
import store from "../redux/store/store";
import { loadUser } from "../redux/actions/authActions";

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

  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { description };
      const response = await fetch("/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("/todos");

      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    store.dispatch(loadUser());

    getTodos();
  }, [auth.user.login]);
  return (
    <>
      <Sidebar />
      <UserPageTemplate pageContext="summary">
        {auth.user.login && <h2>Welcome {auth.user.login}</h2>}

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
                  <StyledButton onClick={() => deleteTodo(todo.id)}>
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
