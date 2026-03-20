import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // unga server port
});

export default instance;