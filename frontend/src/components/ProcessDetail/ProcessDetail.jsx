import React, { Component } from "react";

import socketIOClient from "socket.io-client";
import axios from "axios";

import ProgressGroup from "../ProgressGroup/ProgressGroup";

import "./styles.scss";

const SERVER_URL = "http://localhost:4000";

class ProcessDetail extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4000/",
      process: 0,
      processList: [],
      crawlers: [],
      clickedPm_id: null,
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    axios.get(SERVER_URL + "/crawlers").then((res) => {
      console.log(res.data);
      this.setState({ crawlers: res.data });
    });

    axios.get(SERVER_URL + "/list").then((res) => {
      this.setState({ processList: res.data });
    });

    socket.on("refresh", (data) => {
      this.setState({ processList: data.data });
    });
  }

  render() {
    return (
      <div className="progress-bar-container">
        {this.state.processList
          .filter((process) => process.name === this.props.crawler.slice(0, -3))
          .map((process) => {
            return (
              <ProgressGroup
                clickProcess={this.clickProcess}
                key={process.pm_id}
                pm_id={process.pm_id}
                process={process.monit.cpu}
                status={process.status}
              />
            );
          })}
      </div>
    );
  }
}

export default ProcessDetail;
