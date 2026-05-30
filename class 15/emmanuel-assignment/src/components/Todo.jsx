import { useState } from "react";

// to create a todo
const TodoList = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo = { id: Date.now(), text: input, done: false };

      setTodo([...todo, newTodo]);

      setInput("");
  };



  // to toggle if an item is done or not
  const toggleTodo = (id) => {
    const updatedTodo = todo.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );

    setTodo(updatedTodo);
  };

//   Delete a todo item
  const deleteTodo = (id) => {
    const filteredTodo = todo.filter((todo) => todo.id !== id)

    setTodo(filteredTodo);
  }

//   Remove all Completed todo tasks
  const clearCompleted = () => {
    const activeTodo = todo.filter((todo) => !todo.done)

    setTodo(activeTodo)
  }

// count unfinished tasks 
  const remainingTasks = todo.filter((todo) => !todo.done).length;

  return (
    <div>
      <h1>Todo List</h1>

      {/* input section */}
      <input
        type="text"
        placeholder="Enter a todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
      />

      <button onClick={addTodo}>Add</button>

      {/* The list — rendered with .map() */}
      <ul className="todos">
        {todo.map((todo) => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>

      {/* Empty state: show encouragement when list is empty */}
      {todo.length === 0 && (
        <p className="empty">Nothing to do. Add a task above! 🎉</p>
      )}

      {/* Clear completed button */}
      {todo.length > 0 && (
        <button onClick={clearCompleted}>Clear Completed</button>
      )}

      {/* Remaining tasks count */}
      {todo.length > 0 && (
        <p>{remainingTasks} tasks remaining</p>
      )}
    </div>
  );
};

export default TodoList;
