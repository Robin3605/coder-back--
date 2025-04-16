import { sendEmail } from "../email/sendEmail.js";
import { ticketTemplate } from "../email/templates/tickets.template.js";
import { ticketDao } from "../persistence/dao/ticket.dao.js";
import { v4 as uuid } from "uuid";

class TicketService {
  async createTicket(amount, userMail) {
    const newTicket = {
      code: uuid(),
      purchaser: userMail,
      amount,
    };

    const ticket = await ticketDao.create(newTicket);
    const template = ticketTemplate(
      ticket.code,
      ticket.amount,
      ticket.purchase_datatime,
      ticket.purchaser
    );
    await sendEmail(template, "Nuevo ticket de compra", userMail);
    return ticket;
  }
}

export const ticketService = new TicketService();
