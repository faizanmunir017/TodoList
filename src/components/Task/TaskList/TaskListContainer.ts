import { connect } from "react-redux";

import TaskList from "./TaskList";
import { RootState, AppDispatch } from "../../../State/store";

import {
  removeTask,
  editTask,
  toggleTaskCompletion,
} from "../../../State/taskActions";

const mapStateToProps = (state: RootState) => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onToggleTask: (index: number) => dispatch(toggleTaskCompletion(index)),
  onDeleteTask: (index: number) => dispatch(removeTask(index)),
  onEditTask: (index: number, newName: string) =>
    dispatch(editTask(index, newName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
