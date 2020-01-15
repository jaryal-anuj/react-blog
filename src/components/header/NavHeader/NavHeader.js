import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class NavHeader extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <NavLink className="navbar-brand" to="/">Home</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>    
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signin">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">Signup</NavLink>
                        </li>
                    </ul>
                </div>  
          </nav>
        );
    }
}
export default NavHeader;
