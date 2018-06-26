import axios from "axios";
import { FETCH_USER } from "./types";

// get request to /api/current_user
export const fetchUser = () => {
    return function(dispatch) {
        axios.get("/api/current_user")
        .then(res => dispatch({ type: FETCH_USER, payload: res }));
    }
};