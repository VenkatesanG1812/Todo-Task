import { moveToLearning } from "../controller.ts/todoController";
import { CompletedListType, StateFunctionType } from "../utils/utilsType";

type CompletedListProps = {
  completed: CompletedListType[];
  setCompleted: StateFunctionType<CompletedListType>;
  setData: StateFunctionType<string>;
};
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
            {completed.map((list: CompletedListType, ind: number) => (
              <tr key={list.taskName}>
                <td>
                  <div className="listdata-row">
                    <span>{list.taskName}</span>
                    <button
                      onClick={() =>
                        moveToLearning(ind, setCompleted, setData, list)
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
