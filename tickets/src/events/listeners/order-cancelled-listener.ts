import { Listener, OrderCancelledEvent, Subjects } from '@bitizifytickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    /* ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | */
    //const ticket = await Ticket.findById(data.ticket.id);
    //const order =JSON.parse(JSON.stringify(data.ticket));
    var ticket
    if(typeof(data.ticket.id) != "string"){
      const basehex = Buffer.from(data.ticket.id).toString('hex');
      //console.log(basehex);
      ticket = await Ticket.findById(basehex);
      //console.log(ticket);
    }else{
      ticket = await Ticket.findById({_id:data.ticket.id });
    }
    
    

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: undefined });

    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
    }); 

    msg.ack();
  }
}
