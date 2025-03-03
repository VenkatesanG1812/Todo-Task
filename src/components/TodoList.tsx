import { handleRemove, moveToCompleted } from "../controller.ts/todoController";
import { CompletedListType, StateFunctionType } from "../utils/utilsType";

interface Props {
  listData: string[];
  setData: StateFunctionType<string>;
  setCompleted: StateFunctionType<CompletedListType>;
}
export default function TodoList({ listData, setData, setCompleted }: Props) {
  return (
    <div className="todo-task">
      <table>
        <thead>
          <tr>
            <th>Get to work</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((list: string, ind: number) => (
            <tr key={list}>
              <td>
                <div className="listdata-row">
                  <span>{list}</span>
                  <button onClick={() => handleRemove(ind, setData)}>
                    Remove{" "}
                  </button>
                  <button
                    onClick={() =>
                      moveToCompleted(ind, setData, setCompleted, listData)
                    }
                  >
                    Done
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
