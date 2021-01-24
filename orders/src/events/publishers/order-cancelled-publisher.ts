import { Subjects, Publisher, OrderCancelledEvent } from '@bitizifytickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
