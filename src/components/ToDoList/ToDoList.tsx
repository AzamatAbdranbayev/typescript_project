import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import './ToDoList.css'
interface TodoListProps {
    taskList:any [],
    remove(id:string):void
}
const ToDoList: React.FC<TodoListProps> = ({taskList,remove}) => {
    return (
        <div className="todo__wrapper">
            {taskList.map(task=>{
                return (
                    <TaskItem title={task.title} remove={remove(task.id)}/>
                )
            })}
        </div>
    )
}
export default ToDoList;