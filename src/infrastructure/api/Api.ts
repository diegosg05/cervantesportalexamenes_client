import axios from "axios";

const BASE_URL = "http://localhost:8052/cervantes/exam-platform/api/v1";

export const Api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});