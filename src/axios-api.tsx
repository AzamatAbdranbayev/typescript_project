import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-ps-example2.firebaseio.com",
});

export default instance;
