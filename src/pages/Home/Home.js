import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";
import "./Home.scss";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faDollarSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [amount, setAmount] = useState("");

  let history = useHistory();

  const validateInput = () => {
    if (amount.length !== 5) {
      alert("Input must be 5 digits");
    } else {
      history.push(`/agents/${amount}`);
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
          <form>
            <div className='input-group-container'>
              <label htmlFor='income'>Current income</label>
              <div className='input-group'>
                <span className='input-group-text'>
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
                <input
                  type='number'
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  name='income'
                  value={amount}
                  id='income'
                  className='form-control'
                />
              </div>
            </div>

            <button
              type='button'
              onClick={validateInput}
              className='btn btn-primary'
            >
              Get matches
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
