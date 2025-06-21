import '../App.css';

function TodoList({ todos, onDelete, onToggle }) {
 return (
   <ul>
     {todos.map(todo => (
       <li key={todo._id}>
         <span
           style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
           onClick={() => onToggle(todo._id, !todo.completed)}
         >
           {todo.title}
         </span><br></br>
         <button onClick={() => onDelete(todo._id)}>Delete</button>
       </li>
     ))}
   </ul>
 );
}

export default TodoList;