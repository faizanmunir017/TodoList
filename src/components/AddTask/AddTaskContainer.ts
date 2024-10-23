import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../State/store";
import { addTask } from "../../State/taskSlice";
import AddTask from "./AddTask";

const mapStateToProps = (state: RootState) => {
  return {
    tasks: state.tasks?.tasks || [],
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addTask: (task: any) => dispatch(addTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
