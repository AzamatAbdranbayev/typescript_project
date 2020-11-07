import React, {useState } from "react";
import AddTaskInput from '../AddTaskInput/AddTaskInput';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import axios from "axios";
import "antd/dist/antd.css";
import {Button,Input,Alert, Space} from "antd";    
import {SendOutlined} from "@ant-design/icons";
const {TextArea} = Input;

interface AddTaskFormpProps {
    change():void
}
const AddTaskForm: React.FC<AddTaskFormpProps> = ({change}) => {
    const [taskValue,setTaskValue] = useState<string>("");
    const [visible,setVisible] = useState<boolean>(false);
  
    const handlerChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskValue(event.target.value)
    }

    const handlerKeyPress = (event: React.KeyboardEvent) => {
        if(event.key === "Enter") {
            console.log(taskValue)
        }
    }

    const handlerSubmitTaskValue = () => {
        if(taskValue !== "") {
            axios({
                method:"POST",
                url:"https://todo-ps-b0113.firebaseio.com/task.json",
                data:{
                    id:"0",
                    title:taskValue,
                    completed:false
                }
            })
            .then(()=>{
                change()
            })
           
        }
        else {
            setVisible(true)
        }
    }

    return (
        <>
        {visible?<Alert message="Error" description="Empty value" type="error" closable afterClose={()=>setVisible(false)}/>:null}
        <div className="space-align-container">
            <div className="space-align-block">
                <Space align="center">
                    <TextArea onChange={handlerChange}/>
                    <Button onClick={handlerSubmitTaskValue} type="primary" ghost icon={<SendOutlined/>}>Add</Button>
                </Space>
            </div>
        </div>
            
           {/* <AddTaskInput change={handlerChange} enter={handlerKeyPress}/> */}
           {/* <ButtonSubmit clicked={handlerSubmitTaskValue}/> */}
        </>
    )
}

export default AddTaskForm;