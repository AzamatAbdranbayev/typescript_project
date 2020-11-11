import React, { useState, useEffect, useContext } from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import axios from 'axios';
import ToDoList from './components/ToDoList/ToDoList';
import withLoaderHandler from './hoc/withLoaderHandler/withLoaderHandler';
import { Alert } from 'antd';
import { Task } from './components/ToDoList/ToDoItem';
import SubMenu from 'antd/lib/menu/SubMenu';

const baseUrl = 'https://todo-ps-b0113.firebaseio.com/task';

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [error, showError] = useState<string | null>(null);

  // const [, rerender] = useState(new Date());
  // useEffect(() => {
  //   StateManager.on('change', () => {
  //     rerender(new Date());
  //   })
  // }, []);

  function loadTasks() {
    axios({
      method: 'GET',
      url: `${baseUrl}.json`,
    })
      .then((response) => {
        return Promise.all(
          Object.keys(response.data).map((taskId) => {
            return axios({
              method: 'GET',
              url: `${baseUrl}/${taskId}.json`,
            }).then((response) => {
              response.data.id = taskId;
              return response.data;
            });
          })
        );
      })
      .then((response) => {
        setTaskList(response);
      })
      .catch((e) => showError(e.message));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const handlerRemoveTask = (id: string) => {
    axios({
      method: 'DELETE',
      url: `${baseUrl}/${id}.json`,
    })
      .then(() => {
        setTaskList([]);
        loadTasks();
      })
      .catch((e) => {
        showError(e.message);
      });
  };

  const handlerUpdateTask = (id: string, title: string) => {
    if (!title) {
      showError('Task text cannot be empty');
      return;
    }
    axios({
      method: 'PUT',
      url: `${baseUrl}/${id}.json`,
      data: { id, title },
    })
      .then(() => {
        loadTasks();
      })
      .catch((e) => {
        showError(e.message);
      });
  };

  return (
    <>
      {error ? (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          afterClose={() => showError(null)}
        />
      ) : null}
      <AddTaskForm change={loadTasks}></AddTaskForm>
      <ToDoList taskList={taskList} remove={handlerRemoveTask} updateTask={handlerUpdateTask} />
    </>
  );
};

export default withLoaderHandler(App);
