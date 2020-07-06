import React, { Component } from "react";
import { connect } from "react-redux";
import CanvasJSReact from "../../canvasjs/canvasjs.react";

import "./styles.scss";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const ProcessGraph = (props) => {
  const dataPoints = props.processDetail.cpu_hist.map((cpu, idx) => {
    return { x: idx, y: cpu };
  });

  const options = {
    theme: "dark1",
    subtitles: [
      {
        text: "CPU",
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
        name: "CPU",
        showInLegend: false,
        yValueFormatString: "##.##",
        dataPoints: dataPoints,
      },
    ],
  };

  const containerProps = {
    height: 150,
    width: 250,
  };

  return (
    <div className="chart" height="100px">
      <CanvasJSChart options={options} containerProps={containerProps} />
    </div>
  );
};

export default ProcessGraph;
