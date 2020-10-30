import React,{useState,useEffect} from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import axios from "axios";
import ToDoList from './components/ToDoList/ToDoList';

const App: React.FC = () => {
  const [taskList,setTaskList] = useState<any []>([]);
  const [variableForUpdateUseEffect,setVariableForUpdateUseEffect] = useState<number>(0);

  const handlerChangeVariableForUpdateUseEffect = () => {
    setVariableForUpdateUseEffect(variableForUpdateUseEffect+1);
  }
  useEffect(()=>{
    axios({
        method:"GET",
        url:"https://todo-ps-b0113.firebaseio.com/task.json"
    })
    .then(response=>{
        return Promise.all(Object.keys(response.data).map(taskId=>{
            return axios({
                method:"GET",
                url:`https://todo-ps-b0113.firebaseio.com/task/${taskId}.json`
            })
            .then(response=>{
                response.data.id = taskId;
                return response.data;
            })
        }))
    })
    .then(response=>{
        setTaskList(response)
    })
},[variableForUpdateUseEffect])
  return (
    <>
     <AddTaskForm change={handlerChangeVariableForUpdateUseEffect}></AddTaskForm>
     <ToDoList taskList={taskList}/>
    </>
  )
} 

export default App;
