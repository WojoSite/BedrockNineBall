import React from 'react';
import { NavLink } from 'react-router-dom';
import navstyles from './NavBar.scss';

const NavBar = () => (
  <div className={navstyles.navbar}>
    <NavLink className={navstyles.navlink} activeClassName={navstyles.active} exact to="/">Home</NavLink>

  <ul className={navstyles.navlinks}>
    <li>
      <NavLink className={navstyles.navlink} activeClassName={navstyles.active} to="/calculator">Race Calculator</NavLink>
    </li>

    <li>
      <NavLink className={navstyles.navlink} activeClassName={navstyles.active} to="/schedule">Schedule</NavLink>
    </li>

    <li>
      <NavLink className={navstyles.navlink} activeClassName={navstyles.active} to="/teams">Teams</NavLink>
    </li>

    <li>
      <NavLink className={navstyles.navlink} activeClassName={navstyles.active} to="/rules">Rules</NavLink>
    </li>
  </ul>
  </div>
);

export default NavBar
