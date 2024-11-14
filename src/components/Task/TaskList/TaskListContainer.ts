import { connect } from "react-redux";

import TaskList from "components/Task/TaskList/TaskList";
import { RootState, AppDispatch } from "State/store";
import { bindActionCreators } from "redux";

import { removeTask, editTask, toggleTaskCompletion } from "State/taskActions";

const mapStateToProps = (state: RootState, ownProps: any) => {
  return {
    tasks: state.tasks.tasks,
    key: ownProps.key,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      onToggleTask: toggleTaskCompletion.STARTED,
      onDeleteTask: removeTask.STARTED,
      onEditTask: editTask.STARTED,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
