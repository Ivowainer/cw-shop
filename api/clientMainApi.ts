import axios from "axios";

const clienMainApi = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export default clienMainApi;
