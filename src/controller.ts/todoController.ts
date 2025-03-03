import { LOCAL_STORAGE } from "../constants/localStorage";
import { addNewTask } from "../models/todoModel";
import {
  getDataFromLocalStorage,
  updateLocalStorage,
} from "../utils/storageHandler";
import { StateFunction } from "../utils/utilsType";
export function handleNewLearning(
  newData: string,
  setData: StateFunction<string>,
  setNewData: StateFunction
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
export function handleDone(
  index: number,
  sourceList: StateFunction<string>,
  destination: StateFunction<string>,
  currentList: string[],
  sourceKey: string,
  destinationKey: string
) {
  if (sourceKey === LOCAL_STORAGE.Todo) {
    const taskName = currentList[index];
    const taskNotes = window.prompt(`Enter notes for  "${taskName}" ?`);
    if (taskName && taskNotes) {
      sourceList((prevState) => {
        const updatedArray = prevState.filter(
          (_, currentInd) => currentInd !== index
        );
        updateLocalStorage(sourceKey, updatedArray);
        return updatedArray;
      });
      destination((prevState) => {
        const updatedValue = [...prevState, { taskName, taskNotes }];
        updateLocalStorage(destinationKey, updatedValue);
        return updatedValue;
      });
    }
  } else {
    const taskName = currentList[index].taskName;
    const confirmation = window.confirm(` Do we need to ${taskName} move`);
    if (confirmation) {
      sourceList((prevState) => {
        const updatedArray = prevState.filter(
          (_, currentInd) => currentInd !== index
        );
        updateLocalStorage(sourceKey, updatedArray);
        return updatedArray;
      });
      destination((prevState) => {
        const updatedValue = [...prevState, taskName];
        updateLocalStorage(destinationKey, updatedValue);
        return updatedValue;
      });
    }
  }
}
export function handleRemove(index: number, setData: StateFunction<string>) {
  if (window.confirm("Need to remove ?")) {
    setData((prevState) => {
      const updateList = prevState.filter((_, curr) => curr !== index);
      updateLocalStorage(LOCAL_STORAGE.Todo, updateList);
      return updateList;
    });
  }
}
