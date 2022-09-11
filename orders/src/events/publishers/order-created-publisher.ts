import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@nimishkashyap031/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
