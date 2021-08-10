import React from "react";
import { Link } from "react-router-dom";

//Assets
import brand from "../images/zoe-brand.png";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-brand'>
          <Link to='/home'>
            <img src={brand} alt='Zoe Financial' />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
