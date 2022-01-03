import { Listener, OrderCancelledEvent, Subjects } from "@pktickets6032/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message){
    const ticket = await Ticket.findById(data.ticket.id);

    if(!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: undefined });
    await ticket.save();

    // console.log(ticket.orderId);

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      title: ticket.title,
      price: ticket.price,
      version: ticket.version,
      userId: ticket.userId,
    });

    msg.ack();
  }
}