import axios from "axios";

const SERVE_URL = "http://localhost:8090/";

const instancia = axios.create({
    baseURL: SERVER_URL,
    timeout: 30000,
});

