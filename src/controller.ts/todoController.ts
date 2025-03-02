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
  const completedTask = currentList[index];
  const alertConfirmed = window.confirm(
    `Do we need  "${completedTask}" move ?`
  );
  console.log("sourceList", sourceList);
  if (alertConfirmed && completedTask) {
    sourceList((prevState) => {
      const updatedArray = prevState.filter(
        (_, currentInd) => currentInd !== index
      );
      updateLocalStorage(sourceKey, updatedArray);
      return updatedArray;
    });

    destination((prevState) => {
      const updatedValue = [...prevState, completedTask];
      updateLocalStorage(destinationKey, updatedValue);
      return updatedValue;
    });
  }
}
