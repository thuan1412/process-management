import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, E } from "react-bootstrap";

import { pm2Actions } from "../../utils";
import ProcessGraph from "../ProcessGraph/ProcessGraph";
import ProcessButtons from "../ProcessButtons/ProcessButtons";
import { fetchProcessesDetail } from "../../redux/processesDetail/actions";
import { selectProcess } from "../../redux/selectedProcess/actions";

import "./styles.scss";

class ProcessesDetail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProcessesDetail(this.props.pname);
    this.fetchInterval = setInterval(
      () => this.props.fetchProcessesDetail(this.props.pname),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  render() {
    return (
      <div className="processes-detail">
        <Button
          className="create-btn"
          onClick={() => pm2Actions.create(this.props.pname)}
        >
          Create
        </Button>
        <div className="processes-container">
          {this.props.processesDetail.map((processDetail) => (
            <div key={processDetail.pm_id} className="proc-detail">
              <span className="process-label">
                PM2 ID: {processDetail.pm_id} - {processDetail.status}
              </span>
              <button
                className="view-log-btn"
                onClick={() => this.props.selectProcess(processDetail.pm_id)}
              >
                View log
              </button>
              <div className="graph-btn-container">
                <ProcessGraph processDetail={processDetail} />
                <ProcessButtons
                  pm_id={processDetail.pm_id}
                  status={processDetail.status}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProcessesDetail: (pName) => dispatch(fetchProcessesDetail(pName)),
    selectProcess: (proc) => dispatch(selectProcess(proc)),
  };
};

const mapStateToProps = (state) => {
  const { processesDetail } = state;
  return { processesDetail };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessesDetail);
