import React, { useState, useEffect } from "react";
import axios from "axios";

import { API } from "../../config";

import "./styles.scss";

export default function QueueDetail() {
  const [queueDetail, setQueueDetail] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${API.BASE}${API.RABBITMQ.QUEUE}`, {
          params: {
            queue: "player",
          },
        })
        .then((res) => {
          setQueueDetail(res.data);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <p>{JSON.stringify(queueDetail)}</p>
    </div>
  );
}
