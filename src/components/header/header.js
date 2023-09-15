/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
// import { key } from "../../constants";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
            <button
              className="btn btn-primary btn-block"
              onClick={(e) => {
                e.preventDefault();
                window.location.replace("../login");
                localStorage.removeItem(key.LOGIN_PASSED);
              }}
            >
              Logout
            </button>
          </li> */}
          
          {/* Admin  */}
          {/* <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Administrator Tools
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li className="dropdown-submenu dropdown-hover">
                <a
                  id="dropdownSubMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="dropdown-item dropdown-toggle"
                >
                  User Management
                </a>
                <ul
                  aria-labelledby="dropdownSubMenu2"
                  className="dropdown-menu border-0 shadow"
                >
                  <li>
                    <a tabIndex={-1} href="/listuser" className="dropdown-item">
                      List User
                    </a>
                  </li>
                </ul>
              </li>
            </div>
          </li> */}
        </ul>

        {/* <ul className="navbar-nav ml-auto">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-user" />
            <span className="badge badge-success navbar-badge"> Hello </span>
          </a>
          <ul className="navbar-nav ml-auto ">
            {localStorage.getItem(key.USER_EMP)}
          </ul>{" "}
          &nbsp;&nbsp;
          <div className="float-right d-none d-sm-inline-block">
            <button
              className="btn btn-block btn-danger"
              type="button"
              onClick={(e) => {
                localStorage.removeItem(key.LOGIN_PASSED);
                window.location.replace("../login");
              }}
            >
              Sign out
            </button>
          </div>
        </ul> */}
      </nav>
    );
  }
}

export default Header;
