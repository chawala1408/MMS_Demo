import React from "react";
import ReactApexCharts from "react-apexcharts";

import { api_Influx } from "../../constants";
import axios from "axios";
import { useEffect, useState } from "react";

const Turning_CT_inner = () => {
  const [datas_TN07, setDatas_TN07] = useState({});
//   const [datas_TN02, setDatas_TN02] = useState({});
//   const [datas_TN03, setDatas_TN03] = useState({});
//   const [datas_TN04, setDatas_TN04] = useState({});

  const getPosts1 = async () => {
    try {
      const res_TN07 = await axios.get(
        api_Influx +
          "/query?pretty=true&db=influx&q=SELECT%20D226%20FROM%20%22sensors%22%20WHERE%20mc_no%20=%20%27TN07%27%20ORDER%20BY%20time%20desc%20limit%201"
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
//   const getPosts2 = async () => {
//     try {
//       const res_TN02 = await axios.get(
//         api_Influx +
//           "/query?pretty=true&db=influx&q=SELECT%20D226%20FROM%20%22sensors%22%20WHERE%20mc_no%20=%20%27TN02%27%20ORDER%20BY%20time%20desc%20limit%201"
//       );
//       const keys_TN02 = res_TN02.data.results[0].series[0].columns;
//       const values_TN02 = res_TN02.data.results[0].series[0].values[0];
//       var obj_TN02 = [];
//       keys_TN02.forEach((ele, i) => {
//         obj_TN02[ele] = values_TN02[i];
//       });
//       setDatas_TN02(obj_TN02);
//       console.log(obj_TN02);
//     } catch (err) {
//       console.log(`ERROR: ${err}`);
//     }
//   };

//   const getPosts3 = async () => {
//     try {
//       const res_TN03 = await axios.get(
//         api_Influx +
//           "/query?pretty=true&db=influx&q=SELECT%20D226%20FROM%20%22sensors%22%20WHERE%20mc_no%20=%20%27TN03%27%20ORDER%20BY%20time%20desc%20limit%201"
//       );
//       const keys_TN03 = res_TN03.data.results[0].series[0].columns;
//       const values_TN03 = res_TN03.data.results[0].series[0].values[0];
//       var obj_TN03 = [];
//       keys_TN03.forEach((ele, i) => {
//         obj_TN03[ele] = values_TN03[i];
//       });
//       setDatas_TN03(obj_TN03);
//       console.log(obj_TN03);
//     } catch (err) {
//       console.log(`ERROR: ${err}`);
//     }
//   };

//   const getPosts4 = async () => {
//     try {
//       const res_TN04 = await axios.get(
//         api_Influx +
//           "/query?pretty=true&db=influx&q=SELECT%20D226%20FROM%20%22sensors%22%20WHERE%20mc_no%20=%20%27TN04%27%20ORDER%20BY%20time%20desc%20limit%201"
//       );
//       const keys_TN04 = res_TN04.data.results[0].series[0].columns;
//       const values_TN04 = res_TN04.data.results[0].series[0].values[0];
//       var obj_TN04 = [];
//       keys_TN04.forEach((ele, i) => {
//         obj_TN04[ele] = values_TN04[i];
//       });
//       setDatas_TN04(obj_TN04);
//       console.log(obj_TN04);
//     } catch (err) {
//       console.log(`ERROR: ${err}`);
//     }
//   };

  const MINUTE_MS = 5000;

  useEffect(() => {
    getPosts1();
    // getPosts2();
    // getPosts3();
    // getPosts4();

    const interval = setInterval(() => {
      console.log("Logs every minute");
      getPosts1();
    //   getPosts2();
    //   getPosts3();
    //   getPosts4();
    
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const options = {
      chart: {
        height: 500,
        type: "bar",
        stacked: false,
      },
      stroke: {
        width: [0, 2],
        curve: "smooth",
      },
      dataLabels: {
        enabled: true,
        position: "center",
        style: {
          fontSize: "30px",
          fontWeight: "bold",
        },
      },
      labels: { fontSize: "20px", fontWeight: "bold" },

      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "bottom",
          },
        },
      },

      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },

      xaxis: {
        categories: ["TN07", "TN02", "TN03", "TN04"],
        position: "bottom",
        labels: {
          show: true,
          style: {
            fontSize: "25px",
            fontFamily: "IBM Plex Sans, sans-serif",
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      legend: {
        horizontalAlign: "center", // "center" , "right"
        verticalAlign: "center", // "top" , "bottom"
        fontSize: 25,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],

      yaxis: [
        // Output : Bar option
        {
          labels: {
            style: {
              colors: "black",
              fontSize: "20px",
              fontWeight: "bold",
            },
          },
          title: {
            text: "Cycletime (sec)",
            style: {
              fontSize: "20px",
            },
          },
          min: 0,
          max: 4.0,
          axisTicks: {
            show: true,
          },
        },

        // Target : Line option
        {
          seriesName: "CT Target (pcs)",
          min: 0,
          max: 4.0,
          opposite: true,
          axisTicks: {
            show: true,
          },

          labels: {
            style: {
              colors: "green",
              fontSize: "20px",
              fontWeight: "bold",
            },
            formatter: function (val) {
              return val.toFixed(2);
            },
            labels: { fontSize: "20px", fontWeight: "bold" },
          },

          axisBorder: {
            show: true,

            color: "green",
          },

          title: {
            text: "Target  (sec)",
            style: {
              color: "green",
              fontSize: "20px",
            },
          },
        },
      ],
    },
    All_CT = [
      parseInt(datas_TN07.D226) / 100,
    //   parseInt(datas_TN02.D226) / 100,
    //   parseInt(datas_TN03.D226) / 100,
    //   parseInt(datas_TN04.D226) / 100,
    ];

  let seriesCT_new = {
    name: "Cycle time",
    type: "column",
    data: All_CT,
  };
  //Target TN=2.6
  let seriesTarget_new = {
    name: "Target",
    type: "line",
    data: [1.7, 1.7, 1.7, 1.7],
  };
  let seriesNew = [seriesCT_new, seriesTarget_new];

  return (
    <ReactApexCharts
      options={options}
      series={seriesNew}
      width="830px"
      height="550px"
    />
  );
};

export default Turning_CT_inner;
