import axios from "axios";
import { FETCH_USER } from "./types";

// get request to /api/current_user
export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
};

// post stripe payment token and update user model
export const handleToken = (token) => async dispatch => {
    const res = await axios.post("/api/stripe", token);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = values => {
    return { type: "submit_survey" }
};  