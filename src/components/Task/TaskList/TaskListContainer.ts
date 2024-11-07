import { connect } from "react-redux";

import TaskList from "./TaskList";
import { RootState, AppDispatch } from "State/store";
import { bindActionCreators } from "redux";

import { removeTask, editTask, toggleTaskCompletion } from "State/taskActions";

const mapStateToProps = (state: RootState, ownProps: any) => {
  return {
    tasks: state.tasks,
    key: ownProps.key,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      onToggleTask: toggleTaskCompletion,
      onDeleteTask: removeTask,
      onEditTask: editTask,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
