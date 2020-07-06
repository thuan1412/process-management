import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, TabPane, Button } from "react-bootstrap";

import ProcessesDetail from "./components/ProcessesDetail/ProcessesDetail";
import LogMessage from "./components/LogMessage/LogMessage";

import { fetchProcessesName } from "./redux/processesName/actions";
import { selectProcess } from "./redux/selectedProcess/actions";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProcessesName();
  }

  render() {
    return (
      <div>
        <Tabs
          transition={false}
          id="noanim-tab-example"
          defaultActiveKey={this.props.processesName[0]}
          onSelect={() => this.props.selectProcess(-1)}
        >
          {this.props.processesName.map((proc) => {
            return (
              <TabPane
                key={proc}
                eventKey={proc}
                title={proc}
                unmountOnExit={true}
              >
                <div className="process-container">
                  <ProcessesDetail pname={proc.slice(0, -3)}></ProcessesDetail>
                  <LogMessage selectedProcess={1}></LogMessage>
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProcessesName: () => dispatch(fetchProcessesName()),
    selectProcess: (proc) => dispatch(selectProcess(proc)),
  };
};

const mapStateToProps = (state) => {
  const { processesName } = state;
  return { processesName };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
