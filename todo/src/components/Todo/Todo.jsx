import React, { useEffect, useState } from "react";
import "./Todo.css";
import { FaCheck } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firestore";
import EditTodo from "../EditTodo/EditTodo";

function Todo({ todo }) {
  const [checked, setChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const handleDelete = async (id) => {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
  }

  const handleEdit = () => {
    isEdit === false ? setIsEdit(true) : setIsEdit(false);
  }

  
  useEffect(() => {
    if(todo.completion === "Complete"){
      setChecked(true);
    }
  }, [todo])

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <div className="todo" id={todo.date}>
      <div className="left">
        <label htmlFor="done" className="check">
          <input type="checkbox" name="done" id="done" />
          <span
            className={checked === true ? "radio checked" : "radio"}
            onClick={handleChecked}>
            {checked === true ? <FaCheck className="icon" /> : ""}
          </span>
        </label>
        <div className="content">
          <h3 className={checked === true ? "task-done" : ""}>{todo.title}</h3>
          <p className={checked === true ? "task-done" : ""}>
            {todo.description}
          </p>
        </div>
      </div>
      <div className="right">
        <div className="action-btns">
          <button className="edit-btn" onClick={handleEdit}>
            <MdEdit />
          </button>
          <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
            <MdDeleteForever />
          </button>
        </div>
      </div>
      <EditTodo todoId={isEdit === true ? todo.id : null}/>
    </div>
  );
}

export default Todo;
