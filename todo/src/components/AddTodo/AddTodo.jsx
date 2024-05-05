import React, { useState } from "react";
import "./AddTodo.css";
import { IoMdClose } from "react-icons/io";

function AddTodo() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

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
          <input type="text" id="title" placeholder="Task 1" />
          <label htmlFor="title">Task description</label>
          <textarea type="text" id="description" placeholder="I have to complete this task..." />
          <label htmlFor="title">Task date</label>
          <input type="date" id="date" />
          <div className="completion-status">
            <p>Task completion status</p>
            <div className="wrapper">
              <div className="input-group">
                <label htmlFor="incomplete">Incomplete</label>
                <input type="radio" name="completion" id="incomplete" />
              </div>
              <div className="input-group">
                <label htmlFor="inprogress">In-progress</label>
                <input type="radio" name="completion" id="inprogress" />
              </div>
              <div className="input-group">
                <label htmlFor="complete">Complete</label>
                <input type="radio" name="completion" id="complete" />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel" onClick={handleOpenModal}>Cancel</button>
          <button className="add">Add Todo</button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
