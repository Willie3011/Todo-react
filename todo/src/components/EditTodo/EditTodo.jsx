import React, { useEffect, useState } from "react";
import "./EditTodo.css";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTodos } from "../../context/TodoContext";


function EditTodo({ todoId }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    date: '',
    completion: ''
  });
  const {getTodo, editTodo} = useTodos();

  //get todo
  useEffect(() => {
    async function getData() {
      const data = await getTodo(todoId)
      setTodo(data);
      setToggleModal(!toggleModal);
    }

    getData()
  }, [])

  function removeEmptyValues(obj) {
    return Object.entries(obj)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  }

  async function handleUpdate(){
    setIsLoading(true);
    const updatedTodo = removeEmptyValues(todo);
    console.log(updatedTodo)
    try{
      await editTodo(todoId, updatedTodo);
      setIsLoading(false);
      setToggleModal(false);
    }
    catch (error){
      console.log(error)
      setIsLoading(false)
    }
  }

  function handleChange(e){
    const {name, value} = e.target;
    setTodo(prevTodos => ({
      ...prevTodos, 
      [name] : value
    }))
  }
  return (
    <div
      id={todoId}
      className={toggleModal === true ? "edit-todo open" : "edit-todo close"}>
      <div className="modal-header">
        <h3>Edit Todo</h3>
        <button >
          <IoMdClose />
        </button>
      </div>
      <div className="modal-body">
        <label htmlFor="title">Task title</label>
        <input
        name="title"
          type="text"
          id="title"
          value={todo.title}
          onChange={handleChange}
        />
        <label htmlFor="title">Task description</label>
        <textarea
          name="description"
          type="text"
          id="description"
          value={todo.description}
          onChange={handleChange}
        />
        <label htmlFor="title">Task date</label>
        <input
          name="date"
          type="date"
          id="date"
          value={todo.date}
          onChange={handleChange}
        />
        <div className="completion-status">
          <p>Task completion status</p>
          <select name="completion" value={todo.completion} onChange={handleChange}>
            <option>Select Completion Status</option>
            <option value="todo">Todo</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button className="cancel">Cancel</button>
        <button className="update" onClick={() => handleUpdate()}>Update</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditTodo;
