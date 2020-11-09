import React,{useState,useEffect} from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import axios from "axios";
import ToDoList from './components/ToDoList/ToDoList';
import withLoaderHandler from './hoc/withLoaderHandler/withLoaderHandler';
import { Alert } from 'antd';
const App: React.FC = () => {

  const [taskList,setTaskList] = useState<object []>([]);
  const [variableForUpdateUseEffect,setVariableForUpdateUseEffect] = useState<number>(0);
  const [valueChangedTask,setValueChangedTask] = useState<string>("");
  const [visible,setVisible] = useState<boolean>(false);
  const baseUrl = "https://todo-ps-b0113.firebaseio.com/task";
  const handlerChangeVariableForUpdateUseEffect = () => {
    setVariableForUpdateUseEffect(variableForUpdateUseEffect+1);
  }

  useEffect(()=>{
    axios({
      method:"GET",
      url:`${baseUrl}.json`
    })
    .then(response=>{
      return Promise.all(Object.keys(response.data).map(taskId=>{
        return axios({
          method:"GET",
          url:`${baseUrl}/${taskId}.json`
        })
        .then(response=>{
          response.data.id = taskId;
          return response.data;
        })
      }))
    })
    .then(response=>{
      setTaskList(response);
    })
    .catch(e=>console.log(e))
  },[variableForUpdateUseEffect])

  const handlerRemoveTask = (id:string)=> {
    axios({
      method:"DELETE",
      url:`${baseUrl}/${id}.json`
    })
    .then(()=>{
      setTaskList([]);  
      handlerChangeVariableForUpdateUseEffect();
    })
  }

  const handlerChangedTask = (event:React.ChangeEvent<HTMLTextAreaElement>,id:string) => {
    const newValue = event.currentTarget.value;
    setValueChangedTask(newValue);
  }

  const handlerUpdateTask = (id:string)=>{
    if(valueChangedTask === "") {
      setVisible(true);
      return
    }
    axios({
      method:"PUT",
      url:`${baseUrl}/${id}.json`,
      data:{id:id,title:valueChangedTask}
    })
    .then(()=>{
      handlerChangeVariableForUpdateUseEffect();
    })
  }
  return (
    <>
      {visible
        ?
        <Alert 
          message = "Error" description = "Empty value" 
          type = "error" closable afterClose = {()=>setVisible(false)}
        />
        :
        null
      }
      <AddTaskForm change = {handlerChangeVariableForUpdateUseEffect}></AddTaskForm>
      <ToDoList 
        taskList = {taskList} 
        remove = {handlerRemoveTask} 
        change = {handlerChangedTask} 
        updateTask = {handlerUpdateTask}
      />
    </>
  )
} 

export default withLoaderHandler(App);
