import React, { useEffect, useState } from 'react';
import api from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = () => {
    api.get('/').then(res => setTodos(res.data));
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await api.post('/', { title });
    setTitle('');
    fetchTodos();
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
    <div className="container">
      <h1>To-Do App</h1>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <div className="todo-item">
              <span
                onClick={() => toggleCompleted(todo._id, !todo.completed)}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                {todo.title}
              </span>
              <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
