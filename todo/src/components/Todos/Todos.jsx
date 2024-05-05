import React from "react";
import './Todos.css';
import Todo from '../Todo/Todo';
import AddTodo from "../AddTodo/AddTodo";

function Todos() {
  return (
    <div className="todos">
      <div className="todos-header">
        <h2>Daily Tasks</h2>
        <span className="task-counter">
          <p className="counter">1</p>
          for today
        </span>
      </div>
      <div className="todo-list">
        
      </div>
      <AddTodo/>
    </div>
  );
}

export default Todos;
