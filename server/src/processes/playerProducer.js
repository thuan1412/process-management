const amqp = require("amqplib");

const randomString = require("../utils/randomString");

const queue = "player";

amqp
  .connect("amqp://localhost")
  .then((connection) => {
    // setTimeout(() => {
    //   connection.close();
    //   process.exit(0);
    // }, 500);
    return connection.createChannel();
  })
  .then((channel) => {
    return channel
      .assertQueue(queue, {
        durable: false,
      })
      .then((ok) => {
        setInterval(() => {
          channel.sendToQueue(queue, Buffer.from(randomString(10, "player")));
        }, 1000);
      });
  })
  .catch(console.warn);
