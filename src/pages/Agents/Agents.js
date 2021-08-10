import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getAgents, deleteAgent } from "../../redux/actions/dataAction";

const Agents = ({
  data: { income, loadingAgents, agents: agentsState },
  getAgents,
}) => {
  const [agents, setAgents] = useState([]);
  const [agentsFilter, setAgentsFilter] = useState([]);
  const [agentsStorage, setAgentsStorage] = useState([]);

  const [actualPage, setActualPage] = useState(0);
  const [numberPage, setNumberPage] = useState(1);
  const amount = 0;

  const filterAgents = (agentsData) => {
    let newAgents = agentsData
      .filter(
        (agent) =>
          agent.income <= parseInt(amount) + 10000 &&
          agent.income >= parseInt(amount) - 10000
      )
      .slice(actualPage, numberPage * 3);
    setAgentsFilter(newAgents);
  };

  useEffect(() => {
    getAgents(income);
    filterAgents(agentsState);
  }, []);

  useEffect(() => {
    filterAgents(agents);
  }, [numberPage]);

  const loadMore = () => {
    const actualPageDef = numberPage + 1;
    setNumberPage(actualPageDef);
  };

  const loadLess = () => {
    const actualPageDef = numberPage - 1;
    setNumberPage(actualPageDef);
  };

  const removeAgent = (agentData) => {
    console.log(agentData);
    const newAgents = agentsFilter.filter((agent) => agent.id !== agentData.id);
    setAgentsFilter(newAgents);

    const agentsStorageData = [...agentsStorage, agentData];
    localStorage.setItem("agents", JSON.stringify(agentsStorageData));
  };

  return (
    <div>
      <ul>
        {agentsFilter &&
          agentsFilter.map((agent) => {
            return (
              <li
                key={agent.id}
                onClick={() => {
                  removeAgent(agent);
                }}
              >
                {agent.name} - {agent.income}
              </li>
            );
          })}
      </ul>
      <button onClick={loadMore}>Load more...</button>
      <button onClick={loadLess}>Load Less...</button>
    </div>
  );
};

// Validation PropTypes
Agents.propTypes = {
  getAgents: PropTypes.func.isRequired,
  deleteAgent: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

// Getting state from store
const mapPropsToState = (state) => {
  return {
    data: state.data,
  };
};

// Getting actions to dispatch
const mapPropsToActions = {
  getAgents,
  deleteAgent,
};

export default connect(mapPropsToState, mapPropsToActions)(Agents);
