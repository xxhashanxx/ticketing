import { Subjects, Publisher, PaymentCreatedEvent } from '@bitizifytickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
