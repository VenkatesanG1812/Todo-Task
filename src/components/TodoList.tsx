import { LOCAL_STORAGE } from "../constants/localStorage";
import { handleDone } from "../controller.ts/todoController";
import { StateFunction } from "../utils/utilsType";

interface Props {
  listData: string[];
  setData: StateFunction<string>;
  setCompleted: StateFunction<string>;
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
                  <button
                    onClick={() =>
                      handleDone(
                        ind,
                        setData,
                        setCompleted,
                        listData,
                        LOCAL_STORAGE.Todo,
                        LOCAL_STORAGE.TodoCompleted
                      )
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
