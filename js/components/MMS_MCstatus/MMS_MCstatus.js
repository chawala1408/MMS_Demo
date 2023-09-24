import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constants";
import moment from "moment";
import Swal from "sweetalert2";
import Status_by_topic from "./chart/status_by_topic";
import Non_operatingtime from "./chart/non_operatingtime";
// import Status_by_topic_group from "./chart/status_by_topic_group";
//  import MMS_MC_COMPARE from "./MMS_mc_compare";


class MMS_MCstatus extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      data_all: [],
      DateAll: [],
      mcno: "ic11r",
      time: this.props.time,
      seconds: "1200",
      // data_test: [
      //   { name: 'Non - Operating time', data: [86291, 36659, 16858] },
      //   { name: 'Operating time', data: [86176, 36923, 16904] }
      // ],
      // series_test: ['2023-08-22', '2023-08-23', '2023-08-24'],
    };
  }
  componentDidMount = async () => {
    await this.getDate();
    localStorage.setItem("start_date", this.state.start_date)
    localStorage.setItem("end_date", this.state.end_date)
    console.log(this.state.start_date , this.state.end_date);
    this.getOutput_data();
    this.timer = setInterval(this.tick, 1000);
  }
  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }
  //chart daily
  getOutput_data = async () => {
    // console.log("LOL");

    try {
      const array = await httpClient.post(
        server.Alarm_Non_Operating + "/" + this.state.start_date + "/" + this.state.end_date + "/" + this.state.mcno
      );
      console.log("chart");
      console.log(array);

      let list_oper_all = array.data.result;
      this.setState({ data_all: list_oper_all });
      let listDate = array.data.resultDate;
      this.setState({ DateAll: listDate });

      setTimeout(
        function () {
          //Start the timer
          this.getOutput_data();
        }.bind(this),
        600000 //10 min
      );
    } catch (error) { }
  };
  getDate = () => {
    try {
      this.setState({
        start_date: moment().startOf("month").format("YYYY-MM-DD"),
      });
      this.setState({ end_date: moment().endOf("month").format("YYYY-MM-DD") });
    } catch (error) { }
  };
  click_search = async () => {
    try {
      let result = await httpClient.post(
        server.Alarm_Non_Operating +
        "/" +
        this.state.start_date +
        "/" +
        this.state.end_date +
        "/" +
        this.state.mcno
      );
      console.log(result);
      if (result.data.result.length === 0) {
        this.setState({}).then(() => {
          Swal.fire({
            icon: "warning",
            text: "Can not find data!",
          });
        })
      }
    } catch (error) { }
  };

  render() {

    const divStyle1 = {
      marginBottom: "0",
      width: "300px",
      height: "60px",
      fontWeight: 500,
      fontSize: "2rem",
      color: "black",
      textAlign: "center"
    };
    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="row">
            <div class="col-12">
              {/* <div class="card card-info"> */}
              <div class="card card-primary card-outline card-outline-tabs">
                <div class="card-header p-0 border-bottom-0" style={{background:"#D3F6FF",fontSize:"1.5rem"}}>
                  <ul
                    class="nav nav-tabs"
                    id="custom-tabs-four-tab"
                    role="tablist"
                  >
                    <li class="nav-item"  >
                      <a
                     
                        class="nav-link active"
                        id="custom-tabs-four-home-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-home"
                        role="tab"
                        aria-controls="custom-tabs-four-home"
                        aria-selected="true"
                      >
                        
                        Non-Operating Time
                      </a>
                    </li>
                    {/* <li class="nav-item">
                      <a
                        class="nav-link"
                        id="custom-tabs-four-over_down-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-over_down"
                        role="tab"
                        aria-controls="custom-tabs-four-over_down"
                        aria-selected="false"
                      >
                        Over - Down (80%)
                      </a>
                    </li> */}
                    <li class="nav-item" >
                      <a
                        class="nav-link"
                        id="custom-tabs-four-mc_status-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-mc_status"
                        role="tab"
                        aria-controls="custom-tabs-four-mc_status"
                        aria-selected="false"
                      >
                        M/C by status
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="card-body">
                  <div class="tab-content" id="custom-tabs-four-tabContent">
                    <div
                    
                      class="tab-pane fade show active"
                      id="custom-tabs-four-home"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-home-tab"
                    >
                    <Non_operatingtime />
                    </div>
                    {/* <div
                      class="tab-pane fade"
                      id="custom-tabs-four-over_down"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-over_down-tab"
                    >
                  
                      < MMS_MC_COMPARE/>
                    </div> */}

                    <div
                      class="tab-pane fade"
                      id="custom-tabs-four-mc_status"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-mc_status-tab"
                    >
                      <Status_by_topic />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default MMS_MCstatus;
