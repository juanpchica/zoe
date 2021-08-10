import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import {
  getAgents,
  deleteAgent,
  filterAgents,
} from "../../redux/actions/dataAction";

const Agents = ({
  data: { income, loadingAgents, agents, newAgents },
  getAgents,
  deleteAgent,
  filterAgents,
}) => {
  const [pageNumber, setPageNumber] = useState(1);

  const changePageNumber = (number) => {
    setPageNumber(number);
  };

  // UseEffect Methods
  useEffect(() => {
    getAgents(income);
  }, []);

  useEffect(() => {
    filterAgents(pageNumber);
  }, [pageNumber]);

  //Validate if income does exist
  if (!income) {
    return <Redirect to='/' />;
  }
  console.log(newAgents.length, agents.length);
  return (
    <div>
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
};

export default connect(mapPropsToState, mapPropsToActions)(Agents);
