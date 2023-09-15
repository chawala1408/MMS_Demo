// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



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
import Turning_cover from "./components/realtime/turning_cover";
import Production from "./components/realtime/production";

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

  redirectToHome = () => {
    return <Navigate to="/home" />;
  };
  render() {
    document.title = APP_TITLE;

    return (
      <BrowserRouter>
        <div className="">
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <SideMenu />}

          <Routes>
            <Route
              path="/login"
              element={
                <SecuredRoute>
                  <Login />
                </SecuredRoute>
              }
            />

            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            
            <Route path="/home" element={<Home />} />
            <Route path="/turning_cover" element={<Turning_cover />} />
            <Route path="/production" element={<Production />} />
            


            <Route path="/" element={<this.redirectToHome />} />
            <Route path="*" element={<this.redirectToHome />} />
          </Routes>

          {isLoggedIn() && <Footer />}
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
