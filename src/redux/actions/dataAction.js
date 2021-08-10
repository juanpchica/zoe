import axios from "axios";
import { SET_AGENTS, LOADING_AGENTS, SET_INCOME, DELETE_AGENT } from "../types";

//Fetching Agents
export const getAgents = (income) => (dispatch) => {
  return (dispatch) => {
    dispatch({ type: LOADING_AGENTS });

    axios
      .get("/agents/" + income)
      .then((res) => {
        dispatch({ type: SET_AGENTS, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: SET_AGENTS,
          payload: [],
        });
      });
  };
};

//Set income globally
export const setIncome = (income) => (dispatch) => {
  dispatch({ type: SET_INCOME, payload: income });
};

//Delete one agent
export const deleteAgent = (agent) => (dispatch) => {
  dispatch({ type: DELETE_AGENT, payload: agent });
};