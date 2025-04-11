'use client';

import { useState, useEffect } from 'react';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/TodoService';
import { TodoItem } from './Todo';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    // Load todos when the component mounts
    setTodos(TodoService.getAll());
  }, []);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;
    
    const newTodo = TodoService.create(newTodoText.trim());
    setTodos(TodoService.getAll());
    setNewTodoText('');
  };

  const handleToggle = (id: string) => {
    TodoService.toggleComplete(id);
    setTodos(TodoService.getAll());
  };

  const handleDelete = (id: string) => {
    TodoService.delete(id);
    setTodos(TodoService.getAll());
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <form onSubmit={handleAddTodo} className="mb-4 flex">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border border-gray-300 rounded-l"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      
      <div className="border border-gray-200 rounded">
        {todos.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        {todos.filter(t => t.completed).length} of {todos.length} completed
      </div>
    </div>
  );
} 