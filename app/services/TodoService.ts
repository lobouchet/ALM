import { Todo } from "../models/Todo";

// In-memory database for todos
let todos: Todo[] = [];

export const TodoService = {
  getAll: (): Todo[] => {
    return todos;
  },

  getById: (id: string): Todo | undefined => {
    return todos.find(todo => todo.id === id);
  },

  create: (text: string): Todo => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };
    todos = [...todos, newTodo];
    return newTodo;
  },

  update: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo | undefined => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return undefined;
    
    const updatedTodo = { ...todos[todoIndex], ...updates };
    todos = [...todos.slice(0, todoIndex), updatedTodo, ...todos.slice(todoIndex + 1)];
    return updatedTodo;
  },

  delete: (id: string): boolean => {
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    return todos.length !== initialLength;
  },

  toggleComplete: (id: string): Todo | undefined => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return undefined;
    
    const todo = todos[todoIndex];
    const updatedTodo = { ...todo, completed: !todo.completed };
    todos = [...todos.slice(0, todoIndex), updatedTodo, ...todos.slice(todoIndex + 1)];
    return updatedTodo;
  }
}; 