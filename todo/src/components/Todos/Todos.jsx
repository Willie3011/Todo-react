import React, { useEffect, useState } from "react";
import "./Todos.css";
import Todo from "../Todo/Todo";
import AddTodo from "../AddTodo/AddTodo";
import { useTodos } from "../../context/TodoContext";

function Todos({ dayClicked }) {
  const [todosDisplayed, setTodosDisplayed] = useState([]);
  const { todos, getFilteredTodos } = useTodos();
  const [size, setSize] = useState(todos.length);

  useEffect(() => {
    if (dayClicked === '') {
      setTodosDisplayed(todos);
      
    } else {
      const filteredTodos = getFilteredTodos(todos, dayClicked);
      setTodosDisplayed(filteredTodos);
      setSize(filteredTodos.length);
    }
  }, [dayClicked, todos]);

  return (
    <div className="todos">
      <div className="todos-header">
        <h2>Daily Tasks</h2>
        <span className="task-counter">
          <p className="counter">{size}</p>
          for today
        </span>
      </div>
      <div className="todo-list">
        {todosDisplayed
          ? todosDisplayed.map((todo, index) => (
              <Todo key={index} id={todo.id} todo={todo} />
            ))
          : todos.map((todo, index) => (
              <Todo key={index} id={todo.id} todo={todo} />
            ))}
      </div>
      <AddTodo />
    </div>
  );
}

export default Todos;
