import { connect } from "react-redux";
import { RootState, AppDispatch } from "State/store";
import { addTask } from "State/taskActions";
import AddTask from "components/AddTask/AddTask";
import { bindActionCreators } from "redux";

const mapStateToProps = (state: RootState) => {
  return {
    tasks: state.tasks.tasks,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      addTask: addTask.STARTED,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
