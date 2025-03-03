import { LOCAL_STORAGE } from "../constants/localStorage";
import { addNewTask } from "../models/todoModel";
import {
  getDataFromLocalStorage,
  updateLocalStorage,
} from "../utils/storageHandler";
import {
  CompletedListType,
  StateFunctionType,
  StateFunctionTypeNewTaskType,
} from "../utils/utilsType";
export function handleNewLearning(
  newData: string,
  setData: StateFunctionType<string>,
  setNewData: StateFunctionTypeNewTaskType<string>
) {
  const currentData = getDataFromLocalStorage(LOCAL_STORAGE.Todo);

  let updatedList: string[];
  if (currentData && newData) {
    updatedList = addNewTask(newData, currentData);
    setData(updatedList);
    setNewData("");
    updateLocalStorage(LOCAL_STORAGE.Todo, updatedList);
  }
}
function updateSourceList<T>(
  index: number,
  sourceUpdate: StateFunctionType<T>,
  sourceKey: string
) {
  sourceUpdate((prevState) => {
    const updatedArray = prevState.filter(
      (_, currentInd) => currentInd !== index
    );
    updateLocalStorage(sourceKey, updatedArray);
    return updatedArray;
  });
}
function updateDesinationList<T extends CompletedListType | string>(
  destinationUpdater: StateFunctionType<T>,
  taskObj: T,
  destinationKey: string
) {
  destinationUpdater((prevState) => {
    const updatedList = [...prevState, taskObj];
    updateLocalStorage(destinationKey, updatedList);
    return updatedList;
  });
}
export function moveToCompleted(
  index: number,
  sourceUpdater: StateFunctionType<string>,
  destinationUpdater: StateFunctionType<CompletedListType>,
  currentList: string[]
) {
  const taskName = currentList[index];
  const taskNotes = window.prompt(`Enter notes for ${taskName} ?`);
  if (taskName && taskNotes) {
    updateSourceList(index, sourceUpdater, LOCAL_STORAGE.Todo);

    updateDesinationList(
      destinationUpdater,
      { taskName, taskNotes },
      LOCAL_STORAGE.TodoCompleted
    );
  }
}
export function moveToLearning(
  index: number,
  sourceUpdate: StateFunctionType<CompletedListType>,
  destinationUpdater: StateFunctionType<string>,
  currentList: CompletedListType
) {
  const taskName = currentList.taskName;
  const alertConfimration = window.confirm(
    `Do we need to move ${taskName} to learning again?`
  );
  if (alertConfimration && taskName) {
    updateSourceList(index, sourceUpdate, LOCAL_STORAGE.TodoCompleted);
    updateDesinationList(destinationUpdater, taskName, LOCAL_STORAGE.Todo);
  }
}

export function handleRemove(
  index: number,
  setData: StateFunctionType<string>
) {
  if (window.confirm("Need to remove ?")) {
    setData((prevState) => {
      const updateList = prevState.filter((_, curr) => curr !== index);
      updateLocalStorage(LOCAL_STORAGE.Todo, updateList);
      return updateList;
    });
  }
}
