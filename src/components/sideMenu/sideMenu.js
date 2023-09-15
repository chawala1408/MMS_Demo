/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 40,
      fontWeight: 300,
    };
  }
  render() {
    const divStyle = {
      fontWeight: 600,
      fontSize: "1.4rem",
      color: "white",
    };
    const divStyle2 = {
      fontWeight: 600,
      fontSize: "1.2rem",
      color: "white",
    };
    const divStyle3 = {
      fontWeight: 600,
      fontSize: "1.4rem",
      color: "yellow",
    };
    const divStyle4 = {
      fontWeight: 600,
      fontSize: "1.3rem",
      color: "white",
    };
    const divStyle5 = {
      fontWeight: 600,
      fontSize: "1.4rem",
      color: "BurlyWood",
    };

    // let styleobj = { background: "blue", fontSize: 64 };

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="../../index3.html" className="brand-link">
          {/* <img
            src="dist/img/bearing_nat1.jpg"
            className="img-circle elevation-2"
            alt="User Image"
          ></img> */}
          <span
            className="brand-text font-weight-light"
            style={{ fontSize: this.state.fontSize + "px" }}
          >
            MIC Division
          </span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a>
                <img
                  src="dist/img/NMB_logo.png"
                  className="img-circle elevation-2"
                  alt="User Image"
                ></img>
                <span style={divStyle2}>NMB-Minebea Thai</span>
              </a>
            </div>
          </div>
          <div className="form-inline"></div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <a className="nav-link active">
                  <i className="nav-icon fas fa-columns" />
                  <p style={divStyle}>MMS</p>
                  <i />
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a className="nav-link">
                      <Link to="/Production" className="nav-link">
                        <i className="far fa-dot-circle nav-icon" />
                        <p style={divStyle3}>Production</p>
                      </Link>
                    </a>
                    <a className="nav-link">
                      <Link to="/Home" className="nav-link">
                        <i className="far fa-dot-circle nav-icon" />
                        <p style={divStyle3}>Machine status</p>
                      </Link>
                    </a>

                    <a className="nav-link">
                      <Link to="/Turning_cover" className="nav-link">
                        <i className="far fa-dot-circle nav-icon" />
                        <p style={divStyle3}>Machine alarm</p>
                      </Link>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

export default SideMenu;
