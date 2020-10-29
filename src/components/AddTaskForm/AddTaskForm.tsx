import React, { useState } from "react";
import AddTaskInput from '../AddTaskInput/AddTaskInput';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import axios from "axios";

const AddTaskForm: React.FC = (props) => {
    const [taskValue,setTaskValue] = useState<string>("");

    const handlerChange = (event:React.ChangeEvent<HTMLInputElement>) => {
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
                    title:taskValue
                }
            })
        }
        else {
            alert("empty value")
        }
    }

    return (
        <>
           <AddTaskInput change={handlerChange} enter={handlerKeyPress}/>
           <ButtonSubmit clicked={handlerSubmitTaskValue}/>
        </>
    )
}

export default AddTaskForm;