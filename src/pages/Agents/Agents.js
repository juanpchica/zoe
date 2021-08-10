import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

//Helpers
import { formatterCurrency } from "../../util/helpers";

//Redux
import { connect } from "react-redux";
import {
  getAgents,
  deleteAgent,
  filterAgents,
  orderAgents,
} from "../../redux/actions/dataAction";

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
                      <select
                        onChange={(e) => {
                          setOrderType(e.target.value);
                        }}
                        id='order'
                      >
                        <option value='id'>Select...</option>
                        <option value='name'>Name(A-Z)</option>
                        <option value='id'>ID</option>
                        <option value='income-desc'>Income:High first</option>
                        <option value='income-asc'>Low first</option>
                      </select>
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
                  different income value.
                </div>
              )}

              <div className='action-buttons'>
                {newAgents && newAgents.length < agents.length && (
                  <button
                    onClick={() => {
                      changePageNumber(pageNumber + 1);
                    }}
                  >
                    Load more...
                  </button>
                )}

                {newAgents && newAgents.length >= 3 && (
                  <button
                    onClick={() => {
                      changePageNumber(pageNumber - 1);
                    }}
                  >
                    Load Less...
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
