import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
    const authenticated = props.authenticated;
    return (
    <div className="navbar-nav px-3 py-4 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to={"/"} className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              <h1>DigiAID</h1>
            </Link>
  
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li className="nav-item">
                <Link to={"/"} className={"nav-link " + (props.active === "Home" ? "text-white" : "text-secondary")}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/picker"} className={"nav-link " + (props.active === "Picker" ? "text-white" : "text-secondary")}>
                  Picker
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/bmi"} className={"nav-link " + (props.active === "BMI" ? "text-white" : "text-secondary")}>
                  BMI Calculator
                </Link>
              </li>
              {authenticated && (
                <>

                <li className="nav-item">
                    <Link to={"/recommend"} className={"nav-link " + (props.active === "Recommend" ? "text-white" : "text-secondary")}>
                    Recommend
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/profile"} className={"nav-link " + (props.active === "Profile" ? "text-white" : "text-secondary")}>
                    Profile
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <Link to={'/logout'} className={"nav-link " + (props.active === "Logout" ? "text-white" : "text-secondary")} >
                        Logout
                    </Link>
                </li>
                </>
              )}

        {!authenticated && (
            <li className="nav-item dropdown">
                <Link to={"/login"} className={"nav-link " + (props.active === "Join" ? "text-white" : "text-secondary")} >
                Login
                </Link>
            </li>
        )}
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Navbar;