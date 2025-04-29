import axios from "axios";

export const baseURL = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
