import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, TabPane, Button } from "react-bootstrap";

import ProcessesDetail from "./components/ProcessesDetail/ProcessesDetail";
import LogMessage from "./components/LogMessage/LogMessage";
import QueueDetail from "./components/QueueDetail/QueueDetail";

import { fetchProcesses } from "./redux/processes/actions";
import { selectProcess } from "./redux/selectedProcess/actions";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProcesses();
  }

  render() {
    return this.props.processes.length === 0 ? (
      <div></div>
    ) : (
      <div className="app">
        <div>
          <Tabs
            transition={false}
            defaultActiveKey={this.props.processes[0].name}
            onSelect={() => this.props.selectProcess(-1)}
          >
            {this.props.processes.map((proc) => {
              return (
                <TabPane
                  key={proc.name}
                  eventKey={proc.name}
                  title={proc.name}
                  unmountOnExit={true}
                >
                  <div className="process-container">
                    <ProcessesDetail pname={proc.name}></ProcessesDetail>
                    <LogMessage selectedProcess={1}></LogMessage>
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
        <QueueDetail />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProcesses: () => dispatch(fetchProcesses()),
    selectProcess: (proc) => dispatch(selectProcess(proc)),
  };
};

const mapStateToProps = (state) => {
  const { processes } = state;
  return { processes };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
