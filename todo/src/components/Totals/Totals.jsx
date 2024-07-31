import React, { useState } from "react";
import "./Totals.css";
import { useTodos } from "../../context/TodoContext";

function Totals() {

  const { todos } = useTodos();
  let todoCount = 0,
    inProgressCount = 0,
    doneCount = 0;

  for (const todo of todos) {
    if (todo.completion === "done") {
      doneCount++;
    } else if (todo.completion === "inProgress") {
      inProgressCount++;
    } else if (todo.completion === "todo") {
      todoCount++;
    }
  }

  

  return (
    <div className="totals">
      <div className="total-tasks">
        <h2>Total Tasks</h2>
        <p>{todos.length}</p>
      </div>
      <div className="total-in-progress">
        <h2>Total In Progress</h2>
        <p>{inProgressCount}</p>
      </div>
      <div className="total-complete">
        <h2>Total Complete</h2>
        <p>{doneCount}</p>
      </div>
      <div className="total-incomplete">
        <h2>Total Incomplete</h2>
        <p>{todoCount}</p>
      </div>
    </div>
  );
}

export default Totals;
