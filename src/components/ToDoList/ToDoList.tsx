import React from 'react';
import 'antd/dist/antd.css';
import { Task, ToDoItem } from './ToDoItem';

interface TodoListProps {
  taskList: Task[];
  remove: (id: string) => void;
  updateTask: (id: string) => void;
}

const ToDoList: React.FC<TodoListProps> = ({ taskList, remove, updateTask }) => {
  console.log("tasklist in todolist component",taskList)
  return (
    
    <div className="space-align-container">
      {taskList.map((task, index) => (
        <ToDoItem
          idx={index + 1}
          key={task.id}
          task={task}
          remove={remove}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
};
export default ToDoList;
