import {
  LOADING_AGENTS,
  SET_AGENTS,
  DELETE_AGENT,
  SET_INCOME,
  FILTER_AGENTS,
  ORDER_AGENTS,
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
    case ORDER_AGENTS:
      let key = action.payload;
      const agentsOrdered = state.newAgents.sort((a, b) => {
        //Order by name asc
        if (key === "name") {
          let nameA = a[key].toLowerCase();
          let nameB = b[key].toLowerCase();

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        } else if (key === "id") {
          //Order by ID asc
          return a[key] - b[key];
        } else if (key === "income-asc") {
          //Order by Income asc
          return a.income - b.income;
        } else {
          //Order by Income desc
          return b.income - a.income;
        }
      });
      return {
        ...state,
        newAgents: agentsOrdered,
      };
    case LOADING_AGENTS:
      return {
        ...state,
        loadingAgents: true,
      };
    case DELETE_AGENT:
      //Set in storage
      state.agentsHidden = [...state.agentsHidden, action.payload];
      localStorage.setItem("agentsHidden", JSON.stringify(state.agentsHidden));

      //Remove from UI
      const index = state.newAgents.findIndex(
        (agent) => agent.id === action.payload.id
      );
      state.newAgents.splice(index, 1);
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
