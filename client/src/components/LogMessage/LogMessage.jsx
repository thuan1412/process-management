import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";

import { fetchProcessDetail } from "../../redux/logMessage/actions";
import { API } from "../../config";

import "./styles.scss";

class LogMessage extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      logs: [],
      count: 10,
      hasMore: true,
      type: "out",
    };
  }

  componentDidMount() {
    if (this.props.selectedProcess === -1) {
      this.setState({
        hasMore: false,
      });
      return;
    }
    this.loadLogs();
  }
  componentDidUpdate(prevProps) {
    if (this.props.selectedProcess !== prevProps.selectedProcess) {
      this.setState({
        hasMore: true,
        logs: [],
        offset: 0,
      });
    }
  }

  loadLogs = () => {
    setTimeout(() => {
      axios
        .get(`${API.BASE}${API.LOG.LOG}`, {
          params: {
            offset: this.state.offset,
            count: this.state.count,
            pm_id: this.props.selectedProcess,
            type: this.state.type,
          },
        })
        .then((res) => {
          if (res.data.length >= this.state.count) {
            this.setState({
              logs: this.state.logs.concat(res.data),
              offset: this.state.offset + this.state.count,
            });
          } else if (res.data.length === 0) {
            this.setState({
              hasMore: false,
            });
          } else {
            this.setState({
              logs: this.state.logs.concat(res.data),
              offset: this.state.offset + res.data.length,
            });
          }
        });
    }, 1500);
  };

  handleChecked = (event) => {
    this.setState({
      type: event.target.value,
      hasMore: true,
      logs: [],
      offset: 0,
    });
  };

  reload = (event) => {
    this.setState({
      hasMore: true,
      logs: [],
      offset: 0,
    });
  };

  render() {
    return (
      <div>
        <h4>PM2 Id: {this.props.selectedProcess}</h4>
        <input
          type="radio"
          id="err"
          onChange={this.handleChecked}
          name="logging-type"
          value="out"
          checked={this.state.type === "out"}
        />{" "}
        <label>Out</label>
        <input
          type="radio"
          id="out"
          onChange={this.handleChecked}
          name="logging-type"
          value="err"
        />{" "}
        <label>Error</label>
        <button onClick={this.reload}>Reload</button>
        <div className="log-message-container">
          <InfiniteScroll
            loadMore={this.loadLogs}
            hasMore={this.state.hasMore}
            loader={<h4 key={-1}>Loading...</h4>}
            useWindow={false}
          >
            {this.state.logs.map((log, idx) => (
              <div key={idx}>
                {idx} {log.timestamp}: {log.data}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedProcess } = state;
  return { selectedProcess };
};

export default connect(mapStateToProps)(LogMessage);
