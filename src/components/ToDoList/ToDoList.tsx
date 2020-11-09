import React from "react";
import "antd/dist/antd.css";
import {Button,Input,Space,Typography} from "antd";    
import {DeleteOutlined,SaveOutlined} from "@ant-design/icons";

const {TextArea} = Input;
const {Text} = Typography;

interface TodoListProps {
    taskList:any [],
    remove:(id:string)=>void,
    change:(event:React.ChangeEvent<HTMLTextAreaElement>,id:string)=>void,
    updateTask:(id:string)=>void
}

const ToDoList: React.FC<TodoListProps> = ({taskList,remove,change,updateTask}) => {
    return (
        <div className="space-align-container">
            {taskList.map((task,index)=>{
                return (
                    <div className="space-align-block" style = {{margin:"20px 0"}} key = {task.title}>
                        <Space align="center">
                            <Text mark>#{index+1}</Text>
                            <TextArea
                                onChange = {(event)=>change(event,task.id)}
                                defaultValue = {task.title}
                            />
                            <Button 
                                onClick = {()=>updateTask(task.id)} 
                                type = "primary"
                                icon = {<SaveOutlined/>}
                            >Update</Button>
                            <Button 
                                onClick = {()=>remove(task.id)} 
                                danger
                                icon = {<DeleteOutlined/>}
                            >Delete</Button>
                        </Space>
                    </div>
                )
            })}
        </div>
    )
}
export default ToDoList;