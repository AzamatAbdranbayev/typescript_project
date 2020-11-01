import React from "react";
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';

interface TaskItemProps {
    title:string,
    remove(id:string):void
}
const TaskItem: React.FC<TaskItemProps> = ({title,remove}) => {
    return (
        <>
            <input value={title}/>
            <ButtonSubmit clicked={remove}/>
        </>
    )
}

export default TaskItem;