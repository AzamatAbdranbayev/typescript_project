import React from "react";

interface TaskItemProps {
    title:string,
    remove:(id:string)=>void
}
const TaskItem: React.FC<TaskItemProps> = ({title,remove}) => {
    return (
        <>
            {/* <input value={title}/>
            <button onClick={()=>remove(id:string)}/> */}
        </>
    )
}

export default TaskItem;