import React, { useState, useEffect, Component } from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import axios from 'axios';
import ToDoList from './components/ToDoList/ToDoList';
import withLoaderHandler from './hoc/withLoaderHandler/withLoaderHandler';
import { Alert } from 'antd';
import { Task } from './components/ToDoList/ToDoItem';
import {inject, observer} from 'mobx-react';
import { observe } from 'mobx';
import {actions,state} from "./store/taskStore";

const baseUrl = 'https://todo-ps-b0113.firebaseio.com/task';

const App=inject("state","actions")(observer(class App extends Component {
  componentDidMount() {
    actions.getTasks()
  }
  handlerRemoveTask = (id: string) => {
    actions.deleteTask(id)
  };

  handlerUpdateTask = (id: string) => {
    actions.updateTask(id)
  };
  render () {
    return (
      <>
      {state.valueNewTask}
        <AddTaskForm></AddTaskForm>
        <ToDoList taskList={state.tasks} remove={this.handlerRemoveTask} updateTask={this.handlerUpdateTask} />
      </>
    );
  }
}));
export default App;
//  props => {
//   // const [taskList, setTaskList] = useState<Task[]>([]);
//   const [error, showError] = useState<string | null>(null);
//   // const [, rerender] = useState(new Date());
//   // useEffect(() => {
//   //   StateManager.on('change', () => {
//   //     rerender(new Date());
//   //   })
//   // }, []);

//   function loadTasks() {
//     axios({
//       method: 'GET',
//       url: `${baseUrl}.json`,
//     })
//       .then((response) => {
//         return Promise.all(
//           Object.keys(response.data).map((taskId) => {
//             return axios({
//               method: 'GET',
//               url: `${baseUrl}/${taskId}.json`,
//             }).then((response) => {
//               response.data.id = taskId;
//               return response.data;
//             });
//           })
//         );
//       })
//       .then((response) => {
//         // setTaskList(response);
//       })
//       .catch((e) => showError(e.message));
//   }

//   useEffect(() => {
//     // loadTasks();
//     actions.getTasks()
//   }, []);

//   const handlerRemoveTask = (id: string) => {
//     // axios({
//     //   method: 'DELETE',
//     //   url: `${baseUrl}/${id}.json`,
//     // })
//     //   .then(() => {
//     //     setTaskList([]);
//     //     loadTasks();
//     //   })
//     //   .catch((e) => {
//     //     showError(e.message);
//     //   });
//     actions.deleteTask(id)
//   };

//   const handlerUpdateTask = (id: string) => {
//     // if (!title) {
//     //   showError('Task text cannot be empty');
//     //   return;
//     // }
//     // axios({
//     //   method: 'PUT',
//     //   url: `${baseUrl}/${id}.json`,
//     //   data: { id, title },
//     // })
//     //   .then(() => {
//     //     loadTasks();
//     //   })
//     //   .catch((e) => {
//     //     showError(e.message);
//     //   });
//     actions.updateTask(id)
//   };

//   return (
//     <>
//       {error ? (
//         <Alert
//           message="Error"
//           description={error}
//           type="error"
//           closable
//           afterClose={() => showError(null)}
//         />
//       ) : null}
//       <AddTaskForm change={loadTasks}></AddTaskForm>
//       <ToDoList taskList={state.tasks} remove={handlerRemoveTask} updateTask={handlerUpdateTask} />
//     </>
//   );
// };

// export default withLoaderHandler(App);
