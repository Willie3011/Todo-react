import React, { useEffect, useState } from "react";
import "./EditTodo.css";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

function EditTodo({ todoId }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [completion, setCompletion] = useState("");

  const fetchTodo = async () => {
    if (!todoId) {
      toast.error("No todo ID!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      const todoRef = doc(db, "todos", todoId);
      const todoSnap = await getDoc(todoRef);

      if (todoSnap.exists()) {
        const todo = todoSnap.data();
        setTaskTitle(todo.title);
        setTaskDescription(todo.description);
        setTaskDate(todo.date);
        setCompletion(todo.completion);

      } else {
        toast.error("Todo does not exist!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  const updateTodo = async () => {
    const todo = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      completion: completion,
    };

    await setDoc(doc(db, "todos", todoId), {
        ...todo
    });

    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setCompletion("");
    setToggleModal(false);
    toast.success("Todo updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
    })
  };

  useEffect(() => {
    todoId ? setToggleModal(true) : setToggleModal(false);
    
  }, [todoId]);

  useEffect(() => {
    if(toggleModal === true){
        fetchTodo()
    }
  }, [toggleModal])

  const handleUpdate = () => {
    updateTodo();
  }
  const handleToggleModal = () => {
    toggleModal === true ? setToggleModal(false) : setToggleModal(true);
  };

  const handleRadioChange = (event) => {
    event.target.checked;
  };

  return (
    <div
      id={todoId}
      className={toggleModal === true ? "edit-todo open" : "edit-todo close"}>
      <div className="modal-header">
        <h3>Edit Todo</h3>
        <button onClick={handleToggleModal}>
          <IoMdClose />
        </button>
      </div>
      <div className="modal-body">
        <label htmlFor="title">Task title</label>
        <input
          type="text"
          id="title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <label htmlFor="title">Task description</label>
        <textarea
          type="text"
          id="description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <label htmlFor="title">Task date</label>
        <input
          type="date"
          id="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
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
                checked={completion === "Incomplete" ? true : false}
                onChange={handleRadioChange}
              />
              <label htmlFor="incomplete">Incomplete</label>
            </div>
            <div className="input-group">
              <input
                type="radio"
                name="completion"
                id="inprogress"
                checked={completion === "Inprogress" ? true : false}
                onChange={handleRadioChange}
                onClick={() => setCompletion("Inprogress")}
              />
              <label htmlFor="inprogress">In-progress</label>
            </div>
            <div className="input-group">
              <input
                type="radio"
                name="completion"
                id="complete"
                checked={completion === "Complete" ? true : false}
                onChange={handleRadioChange}
                onClick={() => setCompletion("Complete")}
              />
              <label htmlFor="complete">Complete</label>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="cancel">Cancel</button>
        <button className="update" onClick={handleUpdate}>Update</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditTodo;
