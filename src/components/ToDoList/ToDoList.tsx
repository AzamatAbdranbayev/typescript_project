import React from "react";
import TaskItem from "../TaskItem/TaskItem";

interface TodoListProps {
    taskList:any []
}
const ToDoList: React.FC<TodoListProps> = ({taskList}) => {
    return (
        <div>
            {taskList.map(task=>{
                return (
                    <TaskItem title={task.title}/>
                )
            })}
        </div>
    )
}
export default ToDoList;