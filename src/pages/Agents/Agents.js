import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import {
  getAgents,
  deleteAgent,
  filterAgents,
  orderAgents,
} from "../../redux/actions/dataAction";

const Agents = ({
  data: { income, loadingAgents, agents, newAgents },
  getAgents,
  deleteAgent,
  filterAgents,
  orderAgents,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [orderType, setOrderType] = useState("id");

  // When click in show/Hide change page number
  const changePageNumber = (number) => {
    setPageNumber(number);
  };

  // UseEffect Methods
  useEffect(() => {
    getAgents(income);
  }, []);

  //Each time the filter or order changed, filter and order are set
  useEffect(() => {
    filterAgents(pageNumber);
    orderAgents(orderType);
  }, [pageNumber, orderType]);

  // Validate if income does exist
  if (!income) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <select
        onChange={(e) => {
          setOrderType(e.target.value);
        }}
      >
        <option value='id'>Select...</option>
        <option value='name'>Name(A-Z)</option>
        <option value='id'>ID</option>
        <option value='income-desc'>Income:High first</option>
        <option value='income-asc'>Low first</option>
      </select>
      <ul>
        {newAgents &&
          newAgents.map((agent) => {
            return (
              <li
                key={agent.id}
                onClick={() => {
                  deleteAgent(agent);
                }}
              >
                {agent.name} - {agent.income}
              </li>
            );
          })}
      </ul>
      {newAgents.length < agents.length && (
        <button
          onClick={() => {
            changePageNumber(pageNumber + 1);
          }}
        >
          Load more...
        </button>
      )}

      {newAgents.length >= 3 && (
        <button
          onClick={() => {
            changePageNumber(pageNumber - 1);
          }}
        >
          Load Less...
        </button>
      )}
    </div>
  );
};

// Validation PropTypes
Agents.propTypes = {
  getAgents: PropTypes.func.isRequired,
  deleteAgent: PropTypes.func.isRequired,
  filterAgents: PropTypes.func.isRequired,
  orderAgents: PropTypes.func.isRequired,
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
  filterAgents,
  orderAgents,
};

export default connect(mapPropsToState, mapPropsToActions)(Agents);
