import React, { useEffect, useState } from "react";
import "./Todo.css";
import { FaCheck } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import EditTodo from "../EditTodo/EditTodo";
import { useTodos } from "../../context/TodoContext";

function Todo({ todo, id }) {
  const [checked, setChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todoData, setTodoData] = useState({
    completion: ''
  })
  const {editTodo, deleteTodo} = useTodos()


  const handleDelete = async (id) => {
    await deleteTodo(id);
  }

  const handleEdit = () => {
    setIsEdit(!isEdit);
    console.log("clicked " + isEdit)
  }

  
  useEffect(() => {
    if(todo.completion === "done"){
      setChecked(true);
    }
    else if(todo.completion === "todo"){
      setChecked(false)
    }
    else if(todo.completion === "inProgress"){
      setChecked(false);
    }
  }, [todo])

  const handleChecked = async () => {
    if(checked === false){
      setTodoData({
        completion: "done"
      })
    }
    else{
      setTodoData({
        completion: "todo"
      })
    }

    try{
      await editTodo(id, todoData)
    }
    catch (error) {
      console.log(error)
    }
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
          <button className="edit-btn" onClick={() => handleEdit()}>
            <MdEdit />
          </button>
          <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
            <MdDeleteForever />
          </button>
        </div>
      </div>
      {
        isEdit === true && <EditTodo todoId={id}/>
      }
    </div>
  );
}

export default Todo;
