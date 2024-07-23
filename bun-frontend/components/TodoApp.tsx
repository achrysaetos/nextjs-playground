import { useState } from "react";

interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todo, setTodo] = useState<string>("");

  const addTodo = (title: string) => {
    setTodos([...todos, { id: todos.length + 1, title, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
        <h1>Todo List</h1>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={() => addTodo(todo)}>Add</button>
        <ul>
            {todos.map((item) => (
                <li key={item.id}>
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleTodo(item.id)}
                    />
                    <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                        {item.title}
                    </span>
                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  );


};