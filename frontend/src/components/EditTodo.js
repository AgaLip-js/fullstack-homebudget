import React, { useState } from "react";
import Modal from "./Modal/Modal";

const EditTodo = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(todo.description);
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-target={`#id${todo.id}`}
        onClick={() => setOpen(true)}
      >
        Edit
      </button>
      {open && (
        <Modal open={open} todo={todo} setOpen={setOpen} description={description} setDescription={setDescription}/>
      )
      }
    </>
  );
};

export default EditTodo;
