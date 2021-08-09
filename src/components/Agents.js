import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [agentsFilter, setAgentsFilter] = useState([]);
  const [agentsStorage, setAgentsStorage] = useState([]);
  const API_URL = "http://localhost:8000/agents";
  const { amount } = useParams();

  const [actualPage, setActualPage] = useState(0);
  const [numberPage, setNumberPage] = useState(1);

  const fetchAgents = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();

    setAgents(data);

    filterAgents(data);
  };

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
    fetchAgents();
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

export default Agents;
