import { useEffect, useState } from "react";
import { fetchCompleted, fetchTodoList } from "../models/todoModel";
import { handleNewLearning } from "../controller.ts/todoController";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";

export default function Todo() {
  const [listData, setData] = useState<string[]>([]);
  const [newData, setNewData] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setData(fetchTodoList());
    setCompleted(fetchCompleted());
  }, []);
  return (
    <div className="todo-container ">
      <TodoList
        listData={listData}
        setData={setData}
        setCompleted={setCompleted}
      />
      <div className="add-task">
        <input
          value={newData}
          type="text"
          onChange={(e) => setNewData(e.target.value)}
        />
        <button onClick={() => handleNewLearning(newData, setData, setNewData)}>
          Add new Learning
        </button>
      </div>
      <CompletedList
        completed={completed}
        setCompleted={setCompleted}
        setData={setData}
      />
    </div>
  );
}
