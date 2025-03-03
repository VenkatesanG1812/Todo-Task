import { handleDone } from "../controller.ts/todoController";
import { StateFunction } from "../utils/utilsType";

interface CompletedListProps {
  completed: string[];
  setCompleted: StateFunction<string>;
  setData: StateFunction<string>;
}
export default function CompletedList({
  completed,
  setCompleted,
  setData,
}: CompletedListProps) {
  return (
    <div className="todo-completed">
      {completed.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Completed Task</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {completed.map((list: string, ind: number) => (
              <tr key={list}>
                <td>
                  <div className="listdata-row">
                    <span>{list.taskName}</span>
                    <button
                      onClick={() =>
                        handleDone(
                          ind,
                          setCompleted,
                          setData,
                          completed,
                          "todoComplete",
                          "todoList"
                        )
                      }
                    >
                      Move
                    </button>
                  </div>
                </td>
                <td>{list.taskNotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
