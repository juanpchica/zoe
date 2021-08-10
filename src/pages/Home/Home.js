import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";

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
        <div className='hero-info'>
          <FontAwesomeIcon icon={faUsers} />
          <h1 className='title-page'>Find the best agent for you!</h1>
          <p>Fill the information below to get your matches.</p>
        </div>
        <form>
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
  );
};

export default Home;
