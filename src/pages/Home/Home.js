import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { setIncome } from "../../redux/actions/dataAction";

//Styles
import "./Home.scss";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faDollarSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

//My Components
import Alert from "../../components/Alert";

const Home = ({ setIncome: setIncomeState }) => {
  let history = useHistory();

  //Local state
  const [income, setIncome] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  // Handle errors notifications
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  // Validate if input lenght digits is correct and redirect
  const handleSubmit = (e) => {
    e.preventDefault();
    if (income.length !== 5) {
      showAlert(true, "Input Value must be equal to 5 ", "danger");
    } else {
      //Set income in state store
      setIncomeState(income);

      history.push(`/agents/`);
    }
  };

  return (
    <div className='page-content page-home'>
      <div className='page-home-content'>
        <div className='text-center home-hero'>
          <FontAwesomeIcon icon={faUsers} className='home-icon' />
          <h1 className='title-page'>Find the best agent for you!</h1>
          <p>Fill the information below to get your matches.</p>
        </div>
        <div className='home-form'>
          {alert.show && <Alert action={alert} removeAlert={showAlert} />}
          <form onSubmit={handleSubmit}>
            <div className='input-group-container'>
              <label htmlFor='income'>Current income</label>
              <div className='input-group'>
                <span className='input-group-text'>
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
                <input
                  type='number'
                  onChange={(e) => {
                    setIncome(e.target.value);
                  }}
                  name='income'
                  value={income}
                  id='income'
                  className='form-control'
                />
              </div>
            </div>

            <button type='submit' className='btn btn-primary'>
              Get matches
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Validation PropTypes
Home.propTypes = {
  setIncome: PropTypes.func.isRequired,
  income: PropTypes.number,
};

// Getting state from store
const mapPropsToState = (state) => {
  return {
    income: state.income,
  };
};

// Getting actions to dispatch
const mapPropsToActions = {
  setIncome,
};

export default connect(mapPropsToState, mapPropsToActions)(Home);
