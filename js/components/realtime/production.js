import React from "react";
import "react-circular-progressbar/dist/styles.css";
// Animation
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constants";
import { api_Influx } from "../../constants";
import axios from "axios";
import { useEffect, useState } from "react";


const Production = () => {

  const [datas_MClist, setDatas_MClist] = useState({});
  const getMachine = async () => {
    try {

      let mc_list_data = await httpClient.get(server.GET_LIST_MC);
      setDatas_MClist(mc_list_data.data.result[0]);
     
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };



  const [datas_MC01, setDatas_MC01] = useState({});

  const getPosts1 = async () => {
    try {
      const res_MC01 = await axios.get(
        api_Influx +
        "/query?pretty=true&db=influx&q=select * from mqtt_consumer order by time desc limit 1"
      );
      const keys_MC01 = res_MC01.data.results[0].series[0].columns;
      const values_MC01 = res_MC01.data.results[0].series[0].values[0];
      var obj_MC01 = [];
      keys_MC01.forEach((ele, i) => {
        obj_MC01[ele] = values_MC01[i];
      });
      setDatas_MC01(obj_MC01);
      console.log("obj")
      console.log(obj_MC01);

    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };

  const MINUTE_MS = 5000;

  useEffect(() => {
    getPosts1();
    getMachine();

    const interval = setInterval(() => {
      console.log("Logs every minute");
      getPosts1();
      getMachine();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);



  const divStyle1 = {
    marginBottom: "0",
    fontWeight: 500,
    fontSize: "4rem",
    color: "black",
  };
  const divStyle2 = {
    marginBottom: "0",
    fontWeight: 600,
    fontSize: "2rem",
    color: "white",
    height: 50,
  };
  const divStyle3 = {
    marginBottom: "0",
    fontWeight: 600,
    fontSize: "2rem",
    color: "white",
  };

  const divStyle4 = {
    height: 150,
  };
  const divStyle5 = {
    fontSize: "2rem",
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
                <h3
                  className="page-title"
                  style={{ color: "blue", fontSize: "2rem" }}
                >
                  Machine_no : {datas_MClist.mc_no}
                </h3>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>{datas_MC01.TL_OUT_A}
                      <sub style={divStyle5}>pcs</sub></h3>

                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    Output Shift A
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>
                      {datas_MC01.TL_OUT_A} <sub style={divStyle5}>pcs</sub>
                    </h3>
                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    Output Shift B
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>
                      {datas_MC01.TL_OUT_A}
                      <sub style={divStyle5}>pcs</sub>
                    </h3>
                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    Output Shift C
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>
                      {datas_MC01.YIELD_A}
                      <sub style={divStyle5}>%</sub>
                    </h3>

                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    Yield Shift A
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>
                      {datas_MC01.YIELD_B}
                      <sub style={divStyle5}>%</sub>
                    </h3>
                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    Yield Shift B
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>
                      {datas_MC01.YIELD_C}
                      <sub style={divStyle5}>%</sub>
                    </h3>
                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    Yield Shift C
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>
                      {datas_MC01.TRAY_1_COUNT}
                      <sub style={divStyle5}>pcs</sub>
                    </h3>


                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    TRAY 1 COUNTER
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>
                      {datas_MC01.TRAY_2_COUNT}
                      <sub style={divStyle5}>pcs</sub>
                    </h3>
                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    TRAY 2 COUNTER
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning" style={divStyle4}>
                  <div className="inner">
                    <h3 style={divStyle1}>
                      {datas_MC01.TRAY_3_COUNT}
                      <sub style={divStyle5}>pcs</sub>
                    </h3>
                  </div>
                  <div className="icon"></div>
                  <a href="#" className="small-box-footer" style={divStyle3}>
                    TRAY 3 COUNTER
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="row">
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
            </div> */}
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