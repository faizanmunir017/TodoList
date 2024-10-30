import { connect } from "react-redux";
import { RootState, AppDispatch } from "State/store";
import { addTask } from "State/taskActions";
import AddTask from "./AddTask";
import { bindActionCreators } from "redux";

const mapStateToProps = (state: RootState) => {
  return {
    tasks: state.tasks,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      addTask,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
