import axios from "axios";

const clienMainApi = axios.create({
    baseURL: "/api",
});

export default clienMainApi;
