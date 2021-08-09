import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";

const SearchAgent = () => {
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
    <div>
      <input
        type='number'
        placeholder='Amount:'
        onChange={(e) => {
          setAmount(e.target.value);
        }}
        value={amount}
      />
      <button type='button' onClick={validateInput}>
        MATCH
      </button>
    </div>
  );
};

export default SearchAgent;
