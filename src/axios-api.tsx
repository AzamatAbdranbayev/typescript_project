import axios from "axios";

const instance = axios.create({
    baseURL:"https://todo-ps-b0113.firebaseio.com"
})

export default instance;