import React, { useEffect, useState } from "react";
import "./Todos.css";
import Todo from "../Todo/Todo";
import AddTodo from "../AddTodo/AddTodo";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firestore";

function Todos({dayClicked}) {
  const [todos, setTodos] = useState([]);
  const [size, setSize] = useState(0);
  // get todos from firestore
  const getTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    setSize(querySnapshot.size);
    const todos = querySnapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }))
    
    setTodos(todos);
  };
  
  
  //load todos when the array changes
  useEffect(() => {
    getTodos();
  }, [todos]);
  
  const filteredTodos = todos.filter(todo => todo.date === dayClicked);
  
  const todosToDisplay = filteredTodos.length === 0 ? todos : filteredTodos;
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
        {todosToDisplay.map((todo, index) => (
          <Todo key={index} id={todo.id} todo={todo}/>
        ))}
      </div>
      <AddTodo />
    </div>
  );
}

export default Todos;
