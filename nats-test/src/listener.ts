import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS is closing");
    process.exit();
  });

  // sets manual ackowledgement mode to true
  const options = stan.subscriptionOptions().setManualAckMode(true);
  // to set options, chain the methods

  // default behavior is: auto-mark done after recieving it
  // if service is failed, the event will be lost
  // manually acknowledge

  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  subscription.on("message", (message: Message) => {
    const data = message.getData();
    if (typeof data === "string") {
      console.log(`Received event#${message.getSequence()}, with data:${data}`);
    }

    message.ack();
  });
});

// Change the process if used in windows
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
