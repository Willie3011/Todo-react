import React, { useState } from "react";
import "./AddTodo.css";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTodos } from "../../context/TodoContext";

function AddTodo() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: "",
    completion: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const{createTodo} = useTodos()

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleAddTodo = async () => {
    setIsLoading(true);

    if (
      todo.title === "" ||
      todo.description === "" ||
      todo.date === "" ||
      todo.completion === ""
    ) {
      toast.warning("Please add a todo!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setIsLoading(false);
    } else {
      try {
        await createTodo(todo)
        toast.success("task added", {
          position: "bottom-right",
          autoClose: 5000,
        });

        setIsLoading(false);
        setOpenModal(false);
      } catch (e) {
        toast.error("Error adding document: " + e, {
          position: "bottom-right",
          autoClose: 2000,
        });
        setIsLoading(false);
      }
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: value 
    }));
  }


  return (
    <div className="addTodo">
      <div className="addTodoBtn" onClick={handleOpenModal}>
        <button>Add Todo</button>
      </div>
      <div className={openModal ? "addTodoModal" : "todoModal"}>
        <div className="modal-header">
          <h3>Add Todo</h3>
          <button onClick={handleOpenModal}>
            <IoMdClose />
          </button>
        </div>
        <div className="modal-body">
          <label htmlFor="title">Task title</label>
          <input
            name="title"
            type="text"
            id="title"
            placeholder="Task 1"
            value={todo.title || ''}
            onChange={handleChange}
          />
          <label htmlFor="title">Task description</label>
          <textarea
            name="description"
            type="text"
            id="description"
            value={todo.description}
            placeholder="I have to complete this task..."
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
          <button className="cancel" onClick={handleOpenModal}>
            Cancel
          </button>
          <button className="add" onClick={handleAddTodo} disabled={isLoading}>
            {isLoading ? "Adding Todo..." : "Add Todo"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTodo;
