import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div className="navbar">
    <NavLink className="navlink" activeClassName="active" exact to="/">Home</NavLink>

  <ul className="navlinks">
    <li>
      <NavLink className="navlink" activeClassName="active" to="/calculator">Calculator</NavLink>
    </li>

    <li>
      <NavLink className="navlink" activeClassName="active" to="/schedule">Schedule</NavLink>
    </li>

    <li>
      <NavLink className="navlink" activeClassName="active" to="/teams">Teams</NavLink>
    </li>

    <li>
      <NavLink className="navlink" activeClassName="active" to="/rules">Rules</NavLink>
    </li>
  </ul>
  </div>
);

export default NavBar
