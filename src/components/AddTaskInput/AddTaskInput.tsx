import React from "react";

interface AddTaskInputProps {
    change(event:React.ChangeEvent<HTMLInputElement>):void,
    enter(event: React.KeyboardEvent):void
}
const AddTaskInput: React.FC<AddTaskInputProps> = (props) => {
    return (
        <>
             <input  
                type="text" id="task" 
                placeholder="Введите название задачи" 
                onChange={props.change} 
                onKeyPress={props.enter}
            />
            <label htmlFor="task">Введите название задачи</label>
        </>
    )
}

export default AddTaskInput;