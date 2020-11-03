import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import './ToDoList.css'
interface TodoListProps {
    taskList:any [],
    remove:(id:string)=>void,
    change(event:React.ChangeEvent<HTMLInputElement>,id:string):void,
    updateTask:(id:string)=>void
}
const ToDoList: React.FC<TodoListProps> = ({taskList,remove,change,updateTask}) => {
    return (
        <div className="todo__wrapper">
            {taskList.map(task=>{
                return (
                    // <TaskItem key={task.id} title={task.title} remove={remove(task.id)}/>
                    <div>
                        <input value={task.title} onChange={(event)=>change(event,task.id)}/>
                        <button onClick={()=>updateTask(task.id)}>Update</button>
                        <button onClick={()=>remove(task.id)}>Delete</button>
                    </div>
                    
                )
            })}
        </div>
    )
}
export default ToDoList;