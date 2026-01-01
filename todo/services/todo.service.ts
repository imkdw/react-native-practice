import { Todo } from "@/types/todo.type";
import { getObject, setObject, STORAGE_KEYS } from "@/utils/storage.util";

export const getTodos = async (): Promise<Todo[]> => {
  const todos = await getObject<Todo[]>(STORAGE_KEYS.TODOS);
  return todos ?? [];
};

export const saveTodos = async (todos: Todo[]): Promise<void> => {
  await setObject(STORAGE_KEYS.TODOS, todos);
};

export const addTodo = async (todo: Todo): Promise<Todo[]> => {
  const todos = await getTodos();
  const updated = [...todos, todo];
  await saveTodos(updated);
  return updated;
};

export const updateTodo = async (todoId: string, updates: Partial<Omit<Todo, "id">>): Promise<Todo[]> => {
  const todos = await getTodos();
  const updated = todos.map((todo) => (todo.id === todoId ? { ...todo, ...updates } : todo));
  await saveTodos(updated);
  return updated;
};

export const deleteTodo = async (todoId: string): Promise<Todo[]> => {
  const todos = await getTodos();
  const updated = todos.filter((todo) => todo.id !== todoId);
  await saveTodos(updated);
  return updated;
};

export const findTodoById = async (todoId: string): Promise<Todo> => {
  const todos = await getTodos();

  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo) {
    throw new Error("투두를 찾을 수 없습니다.");
  }

  return todo;
};
