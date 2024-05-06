import React, { useState } from "react";
import "./AddTodo.css";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/firestore'


function AddTodo() {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [completion, setCompletion] = useState("");

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const todo = {
    title: taskTitle,
    description: taskDescription,
    date: taskDate,
    completion: completion,
  };

  const handleAddTodo = async () => {
    setIsLoading(true);
    
    if(taskTitle === "" || taskDescription === ""  || taskDate === "" || completion === ""){
      toast.warning("Please add a todo!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setIsLoading(false);
    }
    else{
      try {
        await addDoc(collection(db, "todos"), {
          title: todo.title,
          description: todo.description,
          date: todo.date,
          completion: todo.completion
        });
        toast.success("task added", {
          position: "bottom-right",
          autoClose: 5000,
        });

        setIsLoading(false);
        setOpenModal(false);

        setTaskTitle("");
        setTaskDescription("");
        setTaskDate("");
      } catch (e) {
        toast.error("Error adding document: " + e,{
          position: "bottom-right",
          autoClose: 2000,
        });
        setIsLoading(false);
      }
    }

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
            type="text"
            id="title"
            placeholder="Task 1"
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
          />
          <label htmlFor="title">Task description</label>
          <textarea
            type="text"
            id="description"
            value={taskDescription}
            placeholder="I have to complete this task..."
            onChange={e => setTaskDescription(e.target.value)}
          />
          <label htmlFor="title">Task date</label>
          <input
            type="date"
            id="date"
            value={taskDate}
            onChange={e => setTaskDate(e.target.value)}
          />
          <div className="completion-status">
            <p>Task completion status</p>
            <div className="wrapper">
              <div className="input-group">
                <input
                  type="radio"
                  name="completion"
                  id="incomplete"
                  onClick={() => setCompletion("Incomplete")}
                />
                <label htmlFor="incomplete">Incomplete</label>
              </div>
              <div className="input-group">
                <input
                  type="radio"
                  name="completion"
                  id="inprogress"
                  onClick={() => setCompletion("Inprogress")}
                />
                <label htmlFor="inprogress">In-progress</label>
              </div>
              <div className="input-group">
                <input
                  type="radio"
                  name="completion"
                  id="complete"
                  onClick={() => setCompletion("Complete")}
                /><label htmlFor="complete">Complete</label>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel" onClick={handleOpenModal}>
            Cancel
          </button>
          <button className="add" onClick={handleAddTodo} disabled={isLoading}>{isLoading ? "Adding Todo..." : "Add Todo"}</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTodo;
