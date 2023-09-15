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
import Turning_OUTPUT_inner from "./turning_output_inner";

//LIST REGISTER
//PRODUCTION : OUTPUT
//CYCLE TIME : CT
// UTL : UTL
//MODEL : M34

const Production = () => {
  const [datas_MC01, setDatas_MC01] = useState({});

  const getPosts1 = async () => {
    try {
      const res_MC01 = await axios.get(
        api_Influx +
          "/query?pretty=true&db=influx&q=SELECT%20OUTPUT,CT,UTL,M34%20FROM%20%22sensors%22%20WHERE%20mc_no%20=%20%27MC01%27%20ORDER%20BY%20time%20desc%20limit%201"
      );
      const keys_MC01 = res_MC01.data.results[0].series[0].columns;
      const values_MC01 = res_MC01.data.results[0].series[0].values[0];
      var obj_MC01 = [];
      keys_MC01.forEach((ele, i) => {
        obj_MC01[ele] = values_MC01[i];
      });
      setDatas_MC01(obj_MC01);
      console.log(obj_MC01);
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

  const MC01_OUTPUT = datas_MC01.OUTPUT ? parseInt(datas_MC01.OUTPUT) : 0; //+
  const MC01_CT = datas_MC01.CT ? parseInt(datas_MC01.CT) : 0;
  const MC01_UTL = datas_MC01.UTL / 10 ? parseInt(datas_MC01.UTL) / 10 : 0;
  const MC01_YIELD = datas_MC01.YIELD / 10 ? parseInt(datas_MC01.UTL) / 10 : 0;

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
    color: "white",
    height:200,
  };
  const divStyle3 = {
    marginBottom: "0",
    fontWeight: 600,
    fontSize: "2rem",
    color: "white",
  };

  const divStyle4 = {
    height: 275,
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
                <h3 className="page-title" >
                  MODEL : XXXXXX
                </h3>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>{datas_MC01.OUTPUT}</h3>
                    <p style={divStyle2}>pcs</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    PRODUCTION OUTPUT
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>{datas_MC01.CT}</h3>
                    <p style={divStyle2}>sec</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    CYCLE TIME
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>{datas_MC01.UTL}</h3>
                    <p style={divStyle2}>%</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    UTL
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>{datas_MC01.YIELD}</h3>
                    <p style={divStyle2}>%</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    YIELD
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div class="col-md-6">
                <div class="card card-primary card-outline">
                  <div className="x_title">
                    <h2>Real time production OUTPUT </h2>
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
                        <Turning_OUTPUT_inner />
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
                              MC01
                            </h1>
                          </div>
                          <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={MC01_UTL}
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
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Production;
