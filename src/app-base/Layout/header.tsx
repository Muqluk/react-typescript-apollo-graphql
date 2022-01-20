import React from 'react';
import { NavLink } from 'react-router-dom';

const liStyle = {
  display: 'inline',
  margin: '2px 5px',
  paddingLeft: '10px',
  borderLeft: '1px solid black',
  color: 'blue',
};

const activeLink = {
  fontWeight: 'bold',
  color: 'red',
};

export const Header = () => (
  <>
    <ul>
      <li style={liStyle}>
        <NavLink activeStyle={activeLink} to="/">
          Home
        </NavLink>
      </li>
      {/* <li style={liStyle}>
        <NavLink activeStyle={activeLink} to="/ygl-users">
          Ygl Users
        </NavLink>
      </li> */}
      {/* <li style={liStyle}>
        <NavLink activeStyle={activeLink} to="/todo-func">
          ToDo Functional
        </NavLink>
      </li> */}
      {/* <li style={liStyle}>
        <NavLink activeStyle={activeLink} to="/todo-class">
          ToDo Class
        </NavLink>
      </li> */}
    </ul>
  </>
);
