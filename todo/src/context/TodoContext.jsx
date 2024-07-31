import React, { useContext, useEffect, useState } from "react"
import { collection, addDoc, onSnapshot, query, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firestore";
const TodoContext = React.createContext();

export function useTodos() {
    return useContext(TodoContext)
}

export function TodoProvider({children}){
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'todos'), (querySnapshot) => {
            const todosArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodos(todosArray);
        });

        return () => unsub();
    }, [])


    async function getTodo(todoId){
        const todoRef = doc(db, "todos", todoId)
        const docSnap = await getDoc(todoRef);

        return docSnap.data();

    }

    function getFilteredTodos(todos, date){
        const filtered = todos.filter(todo => {
            const todoDate = todo.date;
            return date === todoDate;
        });
        
        return filtered;

    }

    function createTodo(todo){
        return addDoc(collection(db, "todos"), todo);
    }

    function editTodo(todoId, todo){
        const todoRef = doc(db, "todos", todoId);

        return updateDoc(todoRef, todo)

    }

    function deleteTodo(todoId){
        const todoRef = doc(db, "todos", todoId);
        return deleteDoc(todoRef);
    }

    const value = {
        todos,
        getTodo,
        getFilteredTodos,
        createTodo,
        editTodo,
        deleteTodo

    }
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}