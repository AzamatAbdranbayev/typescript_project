import React,{useState,useEffect} from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import axios from "axios";
import ToDoList from './components/ToDoList/ToDoList';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler'
import { Alert } from 'antd';
const App: React.FC = () => {
  const [taskList,setTaskList] = useState<any []>([]);
  const [variableForUpdateUseEffect,setVariableForUpdateUseEffect] = useState<number>(0);
  const [valueChangedTask,setValueChangedTask] = useState<string>("")
  const [visible,setVisible] = useState<boolean>(false);

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
      setTaskList(response);
    })
    .catch(e=>console.log(e))
  },[variableForUpdateUseEffect])

  const handlerRemoveTask = (id:string)=> {
    axios({
      method:"DELETE",
      url:`https://todo-ps-b0113.firebaseio.com/task/${id}.json`
    })
    .then(()=>{
      setTaskList([])
      handlerChangeVariableForUpdateUseEffect();
    })
  }
  const handlerChangedTask = (event:React.ChangeEvent<HTMLTextAreaElement>,id:string) => {
    setValueChangedTask(event.target.value);
    const index = taskList.findIndex(elem=>elem.id === id);
    const newTask = {
      id:id,
      title:event.target.value,
      completed:false
    }
    const taskListCopy = taskList;
    taskListCopy[index] = newTask;
    setTaskList(taskListCopy);
  }
  const handlerUpdateTask = (id:string)=>{
    if(valueChangedTask === "") {
      setVisible(true);
      return
    }
    axios({
      method:"PUT",
      url:`https://todo-ps-b0113.firebaseio.com/task/${id}.json`,
      data:taskList[taskList.findIndex(elem=>elem.id === id)]
    })
    .then(()=>{
      handlerChangeVariableForUpdateUseEffect();
    })
  }
  return (
    <>
      {visible?<Alert message="Error" description="Empty value" type="error" closable afterClose={()=>setVisible(false)}/>:null}
      <AddTaskForm change={handlerChangeVariableForUpdateUseEffect}></AddTaskForm>
      <ToDoList taskList={taskList} remove={handlerRemoveTask} change={handlerChangedTask} updateTask={handlerUpdateTask}/>
    </>
  )
} 

export default withErrorHandler(App,axios);
