import { observable as o, action as a } from "mobx";
import axios from "../axios-api";

export interface Task {
    id: string;
    title: string;
}
export interface TaskList {
    tasks:any[],
    error:string | null,
    valueNewTask:string,
    valueCurrentTask:string
}

export const  state:TaskList = o({
    tasks:[],
    error:null,
    valueNewTask:"",
    valueCurrentTask:""
})

export const actions = {
    getTasks: a(()=>{
        axios.get("/task.json")
            .then((response) => {
                const arrayIdFromBD = Object.keys(response.data)
                return Object.values(response.data).map((task:any, index:number)=>{
                    task.id = arrayIdFromBD[index]
                    return task
                })
            })  
            .then(response=>state.tasks=response)
            .then(()=>console.log(state.tasks))
            .catch((e)=>state.error = e.message)
    }),
    deleteTask: a((id: string)=>{
        try {
            axios.delete(`/task/${id}.json`);
            state.tasks = state.tasks.filter(task => task.id !== id)
        }
        catch (e) {
            state.error = e.message
        }
    }),
    addTask: a(()=>{
        const newTask = {
            id: Date.now(),
            title: state.valueNewTask,
        }
        try {
            axios.post(`/task.json`,newTask)
            state.tasks = [...state.tasks,newTask]
        }
        catch (e) {
            state.error = e.message
        }
    }),
    updateTask:a((id: string)=>{
        try {
            axios.put(`/task/${id}.json`,{
                id:id,
                title:state.valueCurrentTask
            })
            state.tasks = state.tasks.map(task =>{
                if(task.id === id) return task.title = state.valueCurrentTask
                else return task
            })
          }
        catch (e) {
            state.error = e.message
        }
    }),
    addTaskValue: a((value:string)=>{
        state.valueNewTask = value
    }),
    changeTaskValue: a((value:string)=>{
        state.valueCurrentTask = value
    }),

}
