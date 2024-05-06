import React, { useEffect, useState } from "react";
import "./Todo.css";
import { FaCheck } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";

function Todo({ todo }) {
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    if(todo.completion === "Complete"){
      setChecked(true);
    }
  }, [])

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <div className="todo" id={todo.id}>
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
          <button className="edit-btn">
            <MdEdit />
          </button>
          <button className="delete-btn">
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
