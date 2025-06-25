import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import api from './api';
import './App.css';

function App() {
 const [todos, setTodos] = useState([]);

 const fetchTodos = () => {
   api.get('/').then(res => setTodos(res.data));
 };

 const deleteTodo = async (id) => {
   await api.delete(`/${id}`);
   fetchTodos();
 };

 const toggleCompleted = async (id, completed) => {
   await api.put(`/${id}`, { completed });
   fetchTodos();
 };

 useEffect(() => {
   fetchTodos();
 }, []);

 return (
   <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <div className="todo-item">
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => onToggle(todo._id, !todo.completed)}
            >
              {todo.title}
            </span>
            <button className="delete-btn" onClick={() => onDelete(todo._id)}>
              Delete
            </button>
          </div>
            </li>
      ))}
    </ul>
 );
}

export default App;