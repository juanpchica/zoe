import axios from "axios";
import {
  SET_AGENTS,
  LOADING_AGENTS,
  SET_INCOME,
  DELETE_AGENT,
  FILTER_AGENTS,
  ORDER_AGENTS,
} from "../types";

//Fetching Agents
export const getAgents = (income) => {
  return (dispatch) => {
    dispatch({ type: LOADING_AGENTS });

    axios
      .get("https://zoe-api.herokuapp.com/agents/" + income)
      .then((res) => {
        dispatch({ type: SET_AGENTS, payload: res.data.agents });
        dispatch({ type: FILTER_AGENTS, payload: 1 });
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

//Filter agents by number page
export const filterAgents = (numberPage) => (dispatch) => {
  dispatch({ type: FILTER_AGENTS, payload: numberPage });
};

//Order agents by key:name
export const orderAgents = (key) => (dispatch) => {
  dispatch({ type: ORDER_AGENTS, payload: key });
};
