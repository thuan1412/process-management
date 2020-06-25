import React, { Component } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";

import socketIOClient from "socket.io-client";
import axios from "axios";

import ProcessDetail from "./components/ProcessDetail/ProcessDetail";
import LogMessage from "./components/LogMessage/LogMessage";
import Infinite from "./components/Infinite";
import { createProcess } from "./utils/onClickActions";
import "./App.scss";

const SERVER_URL = "http://localhost:4000";

class App extends Component {
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

  componentDidUpdate(prevProps, prevState, snapshot) {}

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

    // socket.on("refresh", (data) => {
    //   this.setState({ processList: data.data });
    // });
  }

  clickProcess = (pm_id) => {
    this.setState({ clickedPm_id: pm_id });
  };
  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey={this.state.crawlers[0]}
          onSelect={() => this.setState({ clickedPm_id: null })}
        >
          {this.state.crawlers.map((crawler) => {
            return (
              <Tab key={crawler} eventKey={crawler} title={crawler}>
                <Button onClick={() => createProcess(crawler)}>
                  Add new process
                </Button>
                <div className="process-container">
                  <ProcessDetail crawler={crawler}/>
                  {/* <div className="progress-bar-container">
                    {this.state.processList
                      .filter(
                        (process) => process.name === crawler.slice(0, -3)
                      )
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
                  </div> */}
                  <LogMessage
                    clickedPm_id={this.state.clickedPm_id}
                    crawler={crawler}
                  />
                  {/* <Infinite /> */}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

export default App;
