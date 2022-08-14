import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@nimishkashyap031/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
