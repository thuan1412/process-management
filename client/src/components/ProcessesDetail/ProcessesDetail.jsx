import React, { Component } from "react";
import { connect } from "react-redux";

import ProcessGraph from "../ProcessGraph/ProcessGraph";
import { fetchProcessesDetail } from "../../redux/processesDetail/actions";
class ProcessesDetail extends Component {
  constructor(props) {
    let fetchInterval;
    super(props);
  }
  componentDidMount() {
    this.fetchInterval = setInterval(
      () => this.props.fetchProcessesDetail(this.props.pName),
      3000
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  render() {
    return (
      <div>
        {this.props.processesDetail.length}
        <ProcessGraph processesDetail={this.props.processesDetail} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProcessesDetail: (pName) => dispatch(fetchProcessesDetail(pName)),
  };
};

const mapStateToProps = (state) => {
  const { processesDetail } = state;
  return { processesDetail };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessesDetail);
