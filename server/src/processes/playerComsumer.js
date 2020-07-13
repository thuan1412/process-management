const amqp = require("amqplib");

const queue = "player";

amqp
  .connect("amqp://localhost")
  .then((connection) => {
    return connection.createChannel();
  })
  .then((channel) => {
    channel.assertQueue(queue, {
      durable: false,
    });

    channel.prefetch(1);

    channel.consume(
      queue,
      async (msg) => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 2000);
        });
        channel.ack(msg);
        console.log("Message: ", msg.content.toString());
      },

      {
        noAck: false,
      }
    );
  })
  .catch(console.warn);
