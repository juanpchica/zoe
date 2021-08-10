import {
  LOADING_AGENTS,
  SET_AGENTS,
  DELETE_AGENT,
  SET_INCOME,
  FILTER_AGENTS,
} from "../types";

const initialState = {
  income: null,
  agents: [],
  agentsHidden: [],
  newAgents: [],
  loadingAgents: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INCOME:
      return {
        ...state,
        agents: [],
        agentsHidden: [],
        newAgents: [],
        income: action.payload,
      };
    case SET_AGENTS:
      return {
        ...state,
        agents: action.payload,
      };
    case FILTER_AGENTS:
      const newAgents = state.agents.slice(0, action.payload * 3);
      return {
        ...state,
        newAgents,
        loadingAgents: false,
      };
    case LOADING_AGENTS:
      return {
        ...state,
        loadingAgents: true,
      };
    case DELETE_AGENT:
      //Set in storage
      state.agentsHidden = [...state.agentsHidden, action.payload];
      localStorage.setItem("agentsHidden", state.agentsHidden);

      //Remove from UI
      const index = state.agents.findIndex(
        (agent) => agent.id === action.payload.id
      );
      state.agents.splice(index, 1);
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
