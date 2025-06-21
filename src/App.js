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
   <div className='app'>
     <h1>To-Do App</h1>
     <TodoForm onTodoAdded={fetchTodos} />
     <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleCompleted} />
   </div>
 );
}

export default App;