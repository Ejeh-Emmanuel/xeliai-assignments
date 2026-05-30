import { useState } from 'react';
import '../TodoList.css'; // Importing the CSS file

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: input.trim(), done: false },
    ]);
    setInput('');
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.done));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const remainingCount = todos.filter((todo) => !todo.done).length;
  const hasTodos = todos.length > 0;

  return (
    <div className="todo-container">
      <h2>My Todo List</h2>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-button">
          Add
        </button>
      </div>

      {!hasTodos ? (
        <p className="empty-message">🎉 All caught up! Enjoy your free time!</p>
      ) : (
        <>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <span
                  onClick={() => handleToggleTodo(todo.id)}
                  /* Dynamically applies the .done class if todo.done is true */
                  className={`todo-text ${todo.done ? 'done' : ''}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="delete-button"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="todo-footer">
            <span>
              {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining
            </span>
            <button onClick={handleClearCompleted} className="clear-button">
              Clear completed
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default TodoList;