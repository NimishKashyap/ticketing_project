import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], message: Message): void;

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
  /**
   * Parses the message data
   * Checks type of data
   * if it is a string, it will be parsed to JSON
   * else it will be typecasted to string.
   * @param message
   * @returns
   */
  parseMessage(message: Message): string {
    const data = message.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }
}
