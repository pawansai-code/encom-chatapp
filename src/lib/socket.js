import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000"; // Update when backend is deployed

export const socket = io(BASE_URL, {
    autoConnect: false,
});
