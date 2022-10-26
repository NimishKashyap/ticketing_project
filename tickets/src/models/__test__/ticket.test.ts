import { Ticket } from "../tickets";

it("implements optimistic concurrency control", async () => {
  // Create instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });
  // Save the ticket to database
  await ticket.save();
  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  // make two seperate changes to the ticket we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 30 });
  // save the first fetched ticket (expect success)
  await firstInstance!.save();
  // save the second fetched ticket (expect error)
  await secondInstance!.save();
});