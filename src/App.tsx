import React, { Component } from "react";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import ToDoList from "./components/ToDoList/ToDoList";
import { observer } from "mobx-react";
import { actions, state } from "./store/taskStore";
import Loader from "./components/Loader/Loader";
import { Alert } from "antd";

const App = observer(
  class App extends Component {
    componentDidMount() {
      actions.getTasks();
    }
    handlerRemoveTask = (id: string) => {
      actions.deleteTask(id);
    };

    handlerUpdateTask = (id: string) => {
      actions.updateTask(id);
    };
    render() {
      return (
        <>
          {state.loaderStatus ? <Loader /> : null}
          {state.error ? (
            <Alert
              message="Error"
              description={state.error}
              type="error"
              closable
              afterClose={() => actions.changeErrorValue(null)}
            />
          ) : null}
          <AddTaskForm/>
          <ToDoList
            taskList={state.tasks}
            remove={this.handlerRemoveTask}
            updateTask={this.handlerUpdateTask}
          />
        </>
      );
    }
  }
);
export default App;