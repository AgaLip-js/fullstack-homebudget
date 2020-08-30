import React from "react";
import styled from "styled-components";
import store from "../../redux/store/store";

import { editTodo } from "../../redux/actions/itemsActions";

const StyledModal = styled.div`
  width: 600px;
  background: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px black solid;
  display: ${(props) => (props ? "block" : "none")};
`;
const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledTitle = styled.h4``;
const StyledCloseButton = styled.div`
  right: 0;
  position: absolute;
  margin: 20px;
  cursor: pointer;
`;
const StyledModalBody = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledInput = styled.input``;
const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledEditButton = styled.button``;

const Modal = ({ open, todo, setOpen, description, setDescription }) => {
// const editText = async(id)=> {
//     try {
//         const body = {description};
//         const response = await fetch(`/todos/${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body),
//         })
//         window.location = "/";
      
//     } catch(err){
//         console.error(err.message);
//     }
// }

  return (
    <StyledModal props={open} id={`id${todo.id}`}>
      <StyledContent>
        <StyledHeader>
          <StyledTitle>Edit Todo</StyledTitle>
          <StyledCloseButton
            onClick={() => {
              setOpen(false);
              setDescription(todo.description);
            }}
          >
            Close
          </StyledCloseButton>
        </StyledHeader>
        <StyledModalBody>
          <StyledInput
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
          <StyledFooter>
            <StyledEditButton
            type="button"
            onClick={()=> {
                store.dispatch(editTodo(todo.id, description))
                setOpen(false);
              }
            }
            >Edit</StyledEditButton>
          </StyledFooter>
        </StyledModalBody>
      </StyledContent>
    </StyledModal>
  );
};

export default Modal;
