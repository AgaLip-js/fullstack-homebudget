import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [open, setOpen] = useState(false);
  // const [description, setDescription] = useState(todo.description);
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
    </>
  );
};

export default EditTodo;
