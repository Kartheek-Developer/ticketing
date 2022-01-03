import { OrderCreatedEvent, Publisher, Subjects } from "@pktickets6032/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}