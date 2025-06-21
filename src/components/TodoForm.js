import React, { useState } from 'react';
import api from '../api';
import '../App.css';

function TodoForm({ onTodoAdded }) {
 const [title, setTitle] = useState('');

 const handleSubmit = async (e) => {
   e.preventDefault();
   await api.post('/', { title });
   onTodoAdded();
   setTitle('');
 };

 return (
  
   <form onSubmit={handleSubmit}>
     <input
       placeholder="Add a task"
       value={title}
       onChange={e => setTitle(e.target.value)}
       required
     />
     <button type="submit">Add</button>
   </form>
  
 );
}

export default TodoForm;