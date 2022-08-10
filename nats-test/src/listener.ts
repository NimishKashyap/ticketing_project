import nats, { Message, Stan } from "node-nats-streaming";
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
  // setDeliverAllAvailable() is used to deliver all messages in the queue
  // setDurableName() is used to set the name of the durable queue
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("order-service");
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

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, message: Message): void;

  private client: Stan;

  protected ackWaitTime = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setDurableName(this.queueGroupName);
  }
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (message: Message) => {
      console.log(`
        Message Received: ${this.subject} / ${this.queueGroupName} 
      `);

      const parsedData = this.parseMessage(message);
      this.onMessage(parsedData, message);
    });
  }

  parseMessage(message: Message): string {
    const data = message.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }
}
