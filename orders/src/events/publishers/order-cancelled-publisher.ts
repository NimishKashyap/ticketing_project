import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@nimishkashyap031/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
