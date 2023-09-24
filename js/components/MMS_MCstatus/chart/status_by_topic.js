import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constants";
import moment from "moment";
import Swal from "sweetalert2";

class Status_by_topic extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {

      start_date: moment().subtract(1, "days").format("YYYY-MM-DD"),
      end_date: moment().endOf("month").format("YYYY-MM-DD"),
      data_all: [],
      DateAll: [],
      mcno: "ic11r",
      time: this.props.time,
      //   start_date: localStorage.getItem("start_date"),
      //   end_date: localStorage.getItem("end_date"),
      seconds: "1200",
    };
  }
  componentDidMount = async () => {
    await this.getDate();
    await this.Get_MC_Master();
    // console.log(moment().subtract(1, "month").format("YYYY-MM-DD"));
    //   console.log(moment().endOf("month").subtract(1, "month").format("YYYY-MM-DD"));

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
  //chart ball daily
  getOutput_data = async () => {
    // console.log("LOL");
    const array = await httpClient.post(
      server.MC_by_status + "/" + this.state.start_date + "/" + this.state.end_date + "/" + this.state.mcno
    );
    console.log("by status",array);
    try {
      if (array.data.resultdata[0].length === 0) {
        Swal.fire({
          icon: "warning",
          text: "Can not find data!",
          timer: 1500,
        })
        await this.setState({ data_all: [], DateAll: [] })
      } else {
        let list_oper_all = array.data.result;
        this.setState({ data_all: list_oper_all });
        let listDate = array.data.resultDate;
        this.setState({ DateAll: listDate });
      }

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
    this.setState({
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
    });
    this.setState({
      end_date: moment().endOf("month").format("YYYY-MM-DD")
    }); console.log("diddd", this.state.start_date + "/" + this.state.end_date + "/" + this.state.mcno);

  };
  click_search = async () => {
    this.getOutput_data();
  }
  Get_MC_Master = async () => {
    let mc_list_data = await httpClient.post(server.GET_MASTER_MC);
    await this.setState({
      list_machine: mc_list_data.data.result_basic,
      mcno: mc_list_data.data.result_basic[0].mc_no,
    });
  }
  renderTableRow = () => {
    // console.log("mc",this.state.list_machine);
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_no}</option>);
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
      <div className="row-12">
        <div className="card" style={{ height: "200px" }}>
          <div
            className="card-header"
            style={{
              marginBottom: "0",
              fontWeight: 500,
              fontSize: "2.5rem",
            }}
          >
            M/C by Status
          </div>
          <div
            className="row justify-content-center"
            style={{ paddingTop: "10px", textAlign: "center" }}
          >
            <div class="col-1">
              <h3>Start Date</h3>
            </div>
            <div class="col-2">
              <input
                style={divStyle1}
                class="form-control"
                type="date"
                value={this.state.start_date}
                onChange={async (e) => {
                  await this.setState({
                    start_date: moment(e.target.value).format(
                      "YYYY-MM-DD"
                    ),
                  });
                }}
              />
            </div>

            <div class="col-1">
              <h3>End Date</h3>
            </div>
            <div class="col-2">
              <input
                style={divStyle1}
                class="form-control"
                type="date"
                value={this.state.end_date}
                onChange={async (e) => {
                  await this.setState({
                    end_date: moment(e.target.value).format(
                      "YYYY-MM-DD"
                    ),
                  });
                }}
              />
            </div>
            <div class="col-1">
              <h3>MACHINE</h3>
            </div>
            <div className="col-2">
              <select
                style={divStyle1}
                value={this.state.mcno}
                className="form-control"
                onChange={(e) => {
                  this.setState({ mcno: e.target.value });
                }}
              >
                {/* <option>---</option> */}
                {this.renderTableRow()}
              </select>
            </div>
            <div className="col-1">
              <button
                style={{
                  marginBottom: "0",
                  width: "200px",
                  height: "60px",
                  fontWeight: 500,
                  fontSize: "2rem",
                }}
                type="submit"
                className="btn btn-primary"
                onClick={async (e) => {
                  e.preventDefault();
                  await this.click_search();
                }}
              >
                submit
              </button>
            </div>
          </div>

        </div>
        <div className="page-content">
          <div id="chart">
            <ReactApexCharts
              options={{
                chart: {
                  type: "bar",
                  height: 350,
                  stacked: true,
                  stackType: "100%",
                },
                plotOptions: {
                  bar: {
                    // horizontal: true,
                    horizontal: false,
                  },
                },
                stroke: {
                  width: 1,
                  colors: ["#fff"],
                },
                // title: {
                //   text: "Data for date : " + this.state.datetoday,
                //   style: {
                //     fontSize: '30px',
                //     // fontWeight: 900
                //   }
                // },
                xaxis: {
                  type: "date",
                  labels: {
                    show: true,
                    rotate: -45,
                    style: {
                      colors: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    },
                    // rotateAlways: false,
                    // hideOverlappingLabels: true,
                    // showDuplicates: false,
                    // trim: false,
                    // minHeight: undefined,
                    // maxHeight: 120,
                    // style: {
                    //   colors: [],
                    //   fontSize: "25px",
                    //   fontFamily: "Helvetica, Arial, sans-serif",
                    //   fontWeight: 400,
                    //   cssClass: "apexcharts-xaxis-label",
                    // },
                  },
                  categories: this.state.DateAll,
                  // categories: this.state.series_test,
                },
                yaxis: [
                  {
                    labels: {
                      style: {
                        colors: "black",
                        fontSize: "20px",
                        fontWeight: "bold",
                      },
                    },
                  },
                ],
                dataLabels: {
                  enabled: true,
                  position: "center",
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                  },
                },
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return val + "min";
                    },
                  },
                },
                fill: {
                  opacity: 1,
                },
                colors: [
                  "#37D67A",
                  "#EB144C",
                  "#FFEB3B",
                  "#1273DE",
                  "#9C27B0",
                  "#8ED1FC",
                  "#CDDC39",
                  "#ABB8C3",
                ],
                legend: {
                  horizontalAlign: "center",
                  floating: false,
                  fontSize: "20px",
                  fontFamily: "Helvetica, Arial",
                  position: "right",
                  offsetX: -20,
                  offsetY: 10,
                  formatter: function (seriesName) {
                    return seriesName;

                  },
                },
              }}

              series={this.state.data_all}

              type="bar"
              height={600}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Status_by_topic;
