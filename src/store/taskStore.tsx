import { observable as o, action as a } from "mobx";
import axios from "../axios-api";

export interface TaskList {
  tasks: any[];
  error: string | null;
  valueNewTask: string;
  valueCurrentTask: string;
  loaderStatus: boolean;
}

export const state: TaskList = o({
  tasks: [],
  error: null,
  valueNewTask: "",
  valueCurrentTask: "",
  loaderStatus: false,
});

export const actions = {
  getTasks: a(() => {
    state.loaderStatus = true;
    axios
      .get("/task.json")
      .then((response) => {
        const arrayIdFromBD = Object.keys(response.data);
        return Object.values(response.data).map((task: any, index: number) => {
          task.id = arrayIdFromBD[index];
          return task;
        });
      })
      .then(a((response: object []) => {
        state.tasks = response;
        state.loaderStatus = false;
      }))
      .catch(a((e:any) => {
        state.error = e.message;
        state.loaderStatus = false;
        if (state.tasks.length === 1) {
          state.tasks = [];
        }
      }));
  }),
  deleteTask: a((id: string) => {
    axios
      .delete(`/task/${id}.json`)
      .then(() => actions.getTasks())
      .catch(a((e:any) => (state.error = e.message)));
  }),
  addTask: a(() => {
    if (state.valueNewTask === "") state.error = "empty value";
    else {
      const newTask = {
        id: Date.now(),
        title: state.valueNewTask,
      };
      axios
        .post(`/task.json`, newTask)
        .then(() => actions.getTasks())
        .catch(a((e:any) => (state.error = e.message)));
    }
  }),
  updateTask: a((id: string) => {
    if (state.valueCurrentTask === "") state.error = "empty value";
    else {
      axios
        .put(`/task/${id}.json`, {
          id: id,
          title: state.valueCurrentTask,
        })
        .then(() => actions.getTasks())
        .catch(a((e:any) => (state.error = e.message)));
    }
  }),
  addTaskValue: a((value: string) => {
    state.valueNewTask = value;
  }),
  changeTaskValue: a((value: string) => {
    state.valueCurrentTask = value;
  }),
  changeErrorValue: a((value: string | null) => {
    state.error = value;
  }),
};
