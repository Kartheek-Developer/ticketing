import { Publisher, Subjects, TicketUpdatedEvent } from "@pktickets6032/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}