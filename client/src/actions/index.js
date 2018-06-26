import axios from "axios";
import { FETCH_USER } from "./types";

// get request to /api/current_user
const fetchUser = () => {
    axios.get("/api/current_user");
};