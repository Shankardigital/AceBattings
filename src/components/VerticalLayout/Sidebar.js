import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
import acelogo from "../../assets/images/letast/acelogo.png";

const Sidebar = props => {

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box ">   
          <Link to="/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              <img src={acelogo} alt="" height="22" />
              {/* <h5>Ace Batting</h5> */}
            </span>
            <span className="logo-lg">
              <img src={acelogo} alt="" height="17" />
              {/* <h5>Ace Batting</h5> */}
            </span>
          </Link>

          <Link to="/dashboard" className="logo logo-light">
            <span className="logo-sm">
            {/* <h3 className="text-white mt-4">Ace</h3> */}
              <img src={acelogo} alt="" height="22" />
            </span>
            <span className="logo-lg">
            {/* <h3 className="text-white mt-4">Ace Batting</h3> */}
              <img src={acelogo} alt="" style={{ width: "45px",marginBottom: "13px"}} /> <a style={{fontSize:"20px", fontFamily: 'Freshman'}} className="text-dark mt-5 pt-1" >ACE BATTING</a>
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
