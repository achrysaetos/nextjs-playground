import { useState } from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

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
    <div className="flex flex-col items-center w-1/3 mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Todo</h1>
        <span className="flex items-center gap-2 mb-4 w-full">
            <Input value={todo} onChange={(e) => setTodo(e.target.value)} />
            <Button onClick={() => {addTodo(todo); setTodo("");}} disabled={!todo}>Add</Button>
        </span>
        <ul className="w-full px-1">
            {todos.map((item) => (
                <li key={item.id} className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox checked={item.completed} onCheckedChange={() => toggleTodo(item.id)} />
                        <label className={item.completed ? "line-through" : ""}>
                            {item.title}
                        </label>
                    </div>
                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  );
};