import React from "react";
import PropTypes from "prop-types";

//Styles
import "./Agent.scss";

//Helpers
import { formatterCurrency } from "../../util/helpers";

//Redux
import { connect } from "react-redux";
import { deleteAgent } from "../../redux/actions/dataAction";

const Agent = ({ agent, deleteAgent }) => {
  const { avatar, name, id, income } = agent;
  return (
    <div className='agent-item' onClick={() => deleteAgent(agent)}>
      <div className='agent-avatar'>
        <img src={avatar} alt={name} />
      </div>
      <div className='agent-info'>
        <h3 className='agent-name'>{name}</h3>
        <p>ID:{id}</p>
        <div className='agent-income'>
          Income: <b>{formatterCurrency(income)}</b>
        </div>
      </div>
    </div>
  );
};

// Validation PropTypes
Agent.propTypes = {
  deleteAgent: PropTypes.func.isRequired,
  agent: PropTypes.object.isRequired,
};

export default connect(null, { deleteAgent })(Agent);
