import { PaymentCreatedEvent, Publisher, Subjects } from "@pktickets6032/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
};