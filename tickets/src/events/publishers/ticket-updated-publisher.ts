import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@nimishkashyap031/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
