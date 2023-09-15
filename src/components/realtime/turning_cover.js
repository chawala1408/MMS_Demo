import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { api_Influx } from "../../constants";
import axios from "axios";
import { useEffect, useState } from "react";

import Turning_CT_inner from "./turning_CT_inner";
import Turning_output_inner from "./turning_output_inner";

//LIST REGISTER
//PRODUCTION : D32
//CYCLE TIME : D226
// UTL : D286
//MODEL : M34

const Turning_TN_ALL = () => {
  const [datas_TN07, setDatas_TN07] = useState({});

  const getPosts1 = async () => {
    try {
      const res_TN07 = await axios.get(
        api_Influx +
          "/query?pretty=true&db=influx&q=SELECT%20D32,D226,D286,M34%20FROM%20%22sensors%22%20WHERE%20mc_no%20=%20%27TN07%27%20ORDER%20BY%20time%20desc%20limit%201"
      );
      const keys_TN07 = res_TN07.data.results[0].series[0].columns;
      const values_TN07 = res_TN07.data.results[0].series[0].values[0];
      var obj_TN07 = [];
      keys_TN07.forEach((ele, i) => {
        obj_TN07[ele] = values_TN07[i];
      });
      setDatas_TN07(obj_TN07);
      console.log(obj_TN07);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };

  const MINUTE_MS = 5000;

  useEffect(() => {
    getPosts1();

    const interval = setInterval(() => {
      console.log("Logs every minute");
      getPosts1();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  const All_Output = datas_TN07.D32 ? parseInt(datas_TN07.D32) : 0; //+
  const TN07_CT = datas_TN07.D226 ? parseInt(datas_TN07.D226) : 0;
  const TN07_UTL = datas_TN07.D286 / 10 ? parseInt(datas_TN07.D286) / 10 : 0;

  const divStyle1 = {
    marginBottom: "0",
    fontWeight: 500,
    fontSize: "3rem",
    color: "black",
  };
  const divStyle2 = {
    marginBottom: "0",
    fontWeight: 600,
    fontSize: "2rem",
    color: "black",
  };
  const divStyle3 = {
    marginBottom: "0",
    fontWeight: 600,
    fontSize: "2rem",
    color: "white",
  };

  return (
    <div className="wrapper" style={{ Height: "1000px" }}>
      <div className="content-wrapper" style={{ Height: "1000px" }}>
        <section className="content">
          <div className="main-content-container px-4 container-fluid">
            <div className="page-header py-4 no-gutters row">
              <div className="text-sm-left mb-5 text-center text-md-left mb-sm-3 col-6 col-sm-12">
                <h3 className="page-title" style={divStyle1}>
                  PRODUCTION RESULT
                </h3>
              </div>
              <div className="text-sm-left mb-5 text-center text-md-left mb-sm-3 col-6 col-sm-12">
                <h3 className="page-title" style={divStyle2}>
                  MODEL : XXXXXX
                </h3>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-2 col-3">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3 style={divStyle1}>{All_Output}</h3>
                    <p style={divStyle2}>pcs</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer">
                    <p style={divStyle3}>
                      All <i className="fas fa-arrow-circle-right" />
                    </p>
                  </a>
                </div>
              </div>

              <div className="col-lg-2 col-3">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3 style={divStyle1}>{datas_TN07.D32}</h3>
                    <p style={divStyle2}>pcs</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    TN07
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div class="col-md-6">
                <div class="card card-primary card-outline">
                  <div className="x_title">
                    <h2>Real time production output </h2>
                    <div className="clearfix" />
                  </div>
                  <div>
                    <div
                      className="card-body"
                      style={{
                        height: "590px",
                        width: "600px",
                        padding: "0px",
                        position: "relative",
                      }}
                    >
                      <div>
                        <Turning_output_inner />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card card-primary card-outline">
                  <div className="x_title">
                    <h2>Cycle time </h2>
                    <div className="clearfix" />
                  </div>

                  <div
                    className="card-body"
                    style={{
                      height: "590px",
                      width: "600px",
                      padding: "0px",
                      position: "relative",
                    }}
                  >
                    <Turning_CT_inner />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card card-primary card-outline">
                  <div className="x_title">
                    <h2>Machine Utilization </h2>
                    <div className="clearfix" />
                  </div>
                  <div
                    className="card-body"
                    style={{
                      height: "590px",
                      width: "600px",
                      padding: "0px",
                      position: "relative",
                    }}
                  >
                    <div className="row">
                      <div className="col-4">
                        <div className="card-body" style={{ width: "100%" }}>
                          <div className="d-flex mb-1 ">
                            <h1
                              className="card-title mb-0 align-right"
                              style={{ fontSize: "2rem" }}
                            >
                              TN07
                            </h1>
                          </div>
                          <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={TN07_UTL}
                            duration={1.4}
                            easingFunction={easeQuadInOut}
                          >
                            {(value) => {
                              const roundedValue = Math.round(value);
                              if (roundedValue >= 80) {
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                      textColor: "black",
                                      textSize: "35px",
                                      pathColor: "green",
                                    })}
                                  />
                                );
                              } else if (roundedValue >= 70) {
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                      textColor: "black",
                                      textSize: "35px",
                                      pathColor: "yellow",
                                    })}
                                  />
                                );
                              } else if (roundedValue < 70) {
                                return (
                                  <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({
                                      pathTransition: "none",
                                      textColor: "red",
                                      textSize: "35px",
                                      pathColor: "red",
                                    })}
                                  />
                                );
                              }
                            }}
                          </AnimatedProgressProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Turning_TN_ALL;
