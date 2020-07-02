import React, { Component } from "react";
import { connect } from "react-redux";
import CanvasJSReact from "../../canvasjs/canvasjs.react";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const ProcessGraph = (props) => {
  let dataPoints;
  if (props.processesDetail.length) {
    console.log("repain");
    dataPoints = props.processesDetail[0].cpu_hist.map((cpu, idx) => {
      return { x: idx, y: cpu };
    });
  } else {
    dataPoints = [];
  }

  console.log(props.processesDetail);
  const options = {
    theme: "light2",

    subtitles: [
      {
        text: "GBP & USD to INR",
      },
    ],
    axisY: {
      includeZero: true,
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "area",
        name: "GBP",
        showInLegend: false,
        yValueFormatString: "##.##",
        dataPoints: dataPoints,
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessGraph);
