import { Publisher, OrderCreatedEvent, Subjects } from '@bitizifytickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
