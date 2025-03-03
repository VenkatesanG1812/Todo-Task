export type StateFunctionType<T> = React.Dispatch<React.SetStateAction<T[]>>;
export type StateFunctionTypeNewTaskType<T> = React.Dispatch<
  React.SetStateAction<T>
>;

export interface CompletedListType {
  taskName: string;
  taskNotes: string;
}
