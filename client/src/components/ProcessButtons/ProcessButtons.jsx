import { Button } from "react-bootstrap";

import React from "react";

import { pm2Actions } from "../../utils";
import "./styles.scss";

export default function ProcessButton(props) {
  return (
    <div className="btn-container">
      <Button
        variant="primary"
        size="sm"
        onClick={() => pm2Actions.start(props.pm_id)}
        disabled={props.status === "online"}
      >
        Start
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => pm2Actions.restart(props.pm_id)}
      >
        Restart
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => pm2Actions.stop(props.pm_id)}
        disabled={props.status === "stopped"}
      >
        Stop
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => pm2Actions.delete_(props.pm_id)}
      >
        Delete
      </Button>
    </div>
  );
}
