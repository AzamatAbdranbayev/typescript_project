import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import './ToDoList.css' 
import "antd/dist/antd.css";
import {Button,Input,Space} from "antd";    
import {DeleteOutlined,SaveOutlined} from "@ant-design/icons";
const {TextArea} = Input;

interface TodoListProps {
    taskList:any [],
    remove:(id:string)=>void,
    change:(event:React.ChangeEvent<HTMLTextAreaElement>,id:string)=>void,
    updateTask:(id:string)=>void
}
const ToDoList: React.FC<TodoListProps> = ({taskList,remove,change,updateTask}) => {
    return (
        <div className="space-align-container">
            {taskList.map(task=>{
                return (
                    // <TaskItem key={task.id} title={task.title} remove={remove(task.id)}/>
                        <div className="space-align-block">
                            <Space align="center">
                                <TextArea 
                                    value={task.title} 
                                    onChange={(event)=>change(event,task.id)}
                                />
                                <Button 
                                    onClick={()=>updateTask(task.id)} 
                                    type="primary"
                                    icon={<SaveOutlined/>}
                                >Update</Button>
                                <Button 
                                    onClick={()=>remove(task.id)} 
                                    danger
                                    icon={<DeleteOutlined/>}
                                >Delete</Button>
                            </Space>
                        </div>
                )
            })}
        </div>
    )
}
export default ToDoList;