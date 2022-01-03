import { ExpirationCompleteEvent, Publisher, Subjects } from "@pktickets6032/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}