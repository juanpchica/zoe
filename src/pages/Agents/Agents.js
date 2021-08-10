import React, { useEffect, useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "react-select";

//Helpers
import { formatterCurrency } from "../../util/helpers";

//Styles
import "./Agents.scss";

//Redux
import { connect } from "react-redux";
import {
  getAgents,
  deleteAgent,
  filterAgents,
  orderAgents,
} from "../../redux/actions/dataAction";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

//My Components
import Agent from "../../components/Agent/Agent";

const Agents = ({
  data: { income, loadingAgents, agents, newAgents },
  getAgents,
  filterAgents,
  orderAgents,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [orderType, setOrderType] = useState("id");

  const options = [
    { value: "id", label: "Select..." },
    { value: "name", label: "Name(A-Z)" },
    { value: "id", label: "ID" },
    { value: "income-desc", label: "Income: High first" },
    { value: "income-asc", label: "Income: Low first" },
  ];

  // When click in show/Hide change page number
  const changePageNumber = (number) => {
    setPageNumber(number);
  };

  const handleChange = (selectedOption) => {
    setOrderType(selectedOption.value);
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
    <div className='page-content page-agents'>
      <div className='page-agents-content'>
        <div className='text-center agents-hero'>
          <h2 className='title-page'>Your matches</h2>
          <p>
            Your income: <b>{formatterCurrency(income)}</b>
          </p>
        </div>
        <div className='agents-content'>
          {loadingAgents ? (
            <h2>Loading UI...</h2>
          ) : (
            <div className='agents-view'>
              {newAgents && newAgents.length > 0 ? (
                <Fragment>
                  <div className='input-group-container'>
                    <label htmlFor='order'>Order agents by</label>
                    <div className='input-group'>
                      <Select
                        options={options}
                        onChange={handleChange}
                        className='select-agent'
                      />
                    </div>
                  </div>
                  <div className='list-agents'>
                    {newAgents &&
                      newAgents.map((agent) => {
                        return <Agent key={agent.id} agent={agent} />;
                      })}
                  </div>
                </Fragment>
              ) : (
                <div className={"alert alert-danger"}>
                  No available Agents based on your income. Please try a
                  different income value <Link to='/'>here</Link>
                </div>
              )}

              <div className='action-buttons'>
                {newAgents && newAgents.length >= 3 && (
                  <button
                    onClick={() => {
                      changePageNumber(pageNumber - 1);
                    }}
                    className={
                      newAgents.length === 3
                        ? "btn no-bg color-secondary"
                        : "btn no-bg color-primary"
                    }
                  >
                    Show less
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}

                {newAgents && newAgents.length < agents.length && (
                  <button
                    onClick={() => {
                      changePageNumber(pageNumber + 1);
                    }}
                    className='btn no-bg color-primary'
                  >
                    Show more
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
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
