import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

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
  // setDeliverAllAvailable() is used to deliver all messages in the queue
  // setDurableName() is used to set the name of the durable queue

  // to set options, chain the methods

  // default behavior is: auto-mark done after recieving it
  // if service is failed, the event will be lost
  // manually acknowledge

  new TicketCreatedListener(stan).listen();
});

// Change the process if used in windows
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
