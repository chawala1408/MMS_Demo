import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { Component } from "react";
import { key, YES } from "./constants";
import { APP_TITLE } from "./constants";

// Components from Utils
import Header from "./components/header/header";
import SideMenu from "./components/sideMenu/sideMenu";
import Footer from "./components/footer/footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";

import Register from "./components/register/register";

import Production from "./components/realtime/production";
import Mms_alarm from "./components/realtime/mms_alarm";
import MMS_timeline from "./components/realtime/mms_timeline";
import MMS_MCstatus from "./components/MMS_MCstatus/MMS_MCstatus.js";

const isLoggedIn = () => {
  //return true if === YES
  return localStorage.getItem(key.LOGIN_PASSED) === YES;
};
const SecuredRoute = ({ children }) => {
  if (isLoggedIn()) {
    return children;
  }
  return <Navigate to="/login" />;
};

// const SecuredRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     element={isLoggedIn() === true ? <Component /> : <Navigate to="/login" />}
//   />
// );

// const SecuredAdminRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     element={
//       isLoggedIn() === true ? (
//         localStorage.getItem(key.USER_LV) === "admin" ? (
//           <Component />
//         ) : (
//           <Navigate to="/main" />
//         )
//       ) : (
//         <Navigate to="/login" />
//       )
//     }
//   />
// );

class App extends Component {
  componentDidMount() {}

  redirectToLogin = () => {
    return <Navigate to="/login" />;
  };
  render() {
    document.title = APP_TITLE;

    return (
      <BrowserRouter>
        <div className="">
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <SideMenu />}

          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/home"
              element={
                <SecuredRoute>
                  <Home />
                </SecuredRoute>
              }
            />

            <Route path="/register" element={<Register />} />
            <Route path="/production" element={<Production />} />
            <Route path="/Mms_alarm" element={<Mms_alarm />} />
            <Route path="/mms_timeline" element={<MMS_timeline />} />
            <Route path="/mms_mc_status" element={<MMS_MCstatus />} />
            <Route path="/" element={<this.redirectToLogin />} />
            <Route path="*" element={<this.redirectToLogin />} />
          </Routes>

          {isLoggedIn() && <Footer />}
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
