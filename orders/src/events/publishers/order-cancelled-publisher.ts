import { OrderCancelledEvent, Publisher, Subjects } from "@pktickets6032/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}