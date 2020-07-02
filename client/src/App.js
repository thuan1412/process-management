import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, TabPane, Button } from "react-bootstrap";

import ProcessesDetail from "./components/ProcessesDetail/ProcessesDetail";

import { fetchProcessesName } from "./redux/processesName/actions";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProcessesName();
  }

  componentDidUpdate() {
    console.log("Update");
  }

  render() {
    const { processesName } = this.props;
    return (
      <div>
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          defaultActiveKey={this.props.processesName[0]}
        >
          {this.props.processesName.map((proc) => {
            return (
              <TabPane
                key={proc}
                eventKey={proc}
                title={proc}
                unmountOnExit={true}
              >
                <ProcessesDetail pName={proc.slice(0, -3)}></ProcessesDetail>
              </TabPane>
            );
          })}
        </Tabs>
        {/* <Button variant="primary">Primary</Button>
        <ProcessesDetail pName={"process1.js".slice(0, -3)}></ProcessesDetail> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProcessesName: () => dispatch(fetchProcessesName()),
  };
};

const mapStateToProps = (state) => {
  const { processesName } = state;
  return { processesName };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
