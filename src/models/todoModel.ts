import { initialTodo } from "../constants/initialTodo";
import { LOCAL_STORAGE } from "../constants/localStorage";
import { getDataFromLocalStorage } from "../utils/storageHandler";

export function addNewTask(newTask: string, currentList: string[]) {
  return [...currentList, newTask];
}

export function fetchTodoList() {
  return getDataFromLocalStorage(LOCAL_STORAGE.Todo, initialTodo);
}
export function fetchCompleted() {
  return getDataFromLocalStorage(LOCAL_STORAGE.TodoCompleted, []);
}
