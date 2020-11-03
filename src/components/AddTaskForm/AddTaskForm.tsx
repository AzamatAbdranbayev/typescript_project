import React, {useState } from "react";
import AddTaskInput from '../AddTaskInput/AddTaskInput';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import axios from "axios";
interface AddTaskFormpProps {
    change():void
}
const AddTaskForm: React.FC<AddTaskFormpProps> = ({change}) => {
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
                    title:taskValue,
                    completed:false
                }
            })
            .then(()=>{
                change()
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