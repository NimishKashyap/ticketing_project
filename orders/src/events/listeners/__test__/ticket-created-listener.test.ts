import { TicketCreatedEvent } from "@nimishkashyap031/common";
import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  //create an instance of listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  //create a fake data event
  const data: TicketCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // create a fake message object

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates and saves a ticket", async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage function with data object + message object
  await listener.onMessage(data, msg);
  // make assertions to make sure a ticket was created

  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it("acknowledges the message", async () => {
  // call the onMessage with data +  message
  const { data, msg, listener } = await setup();

  await listener.onMessage(data, msg);
  // make assertions to make sure ack function was called

  expect(msg.ack).toHaveBeenCalled();
});
