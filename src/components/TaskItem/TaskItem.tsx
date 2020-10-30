import React from "react";
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';

interface TaskItemProps {
    title:string
}
const TaskItem: React.FC<TaskItemProps> = ({title}) => {
    return (
        <>
            <input value={title}/>
            <ButtonSubmit clicked={()=>console.log("test")}/>
        </>
    )
}

export default TaskItem;