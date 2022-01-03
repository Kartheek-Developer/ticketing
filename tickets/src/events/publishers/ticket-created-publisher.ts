import { Publisher, Subjects, TicketCreatedEvent } from "@pktickets6032/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}