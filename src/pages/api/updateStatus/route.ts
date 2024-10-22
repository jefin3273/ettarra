import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { eventId, newStatus } = req.body;
    try {
      await prisma.booking.update({
        where: { id: eventId },
        data: { status: newStatus },
      });
      res.status(200).json({ message: `Booking status updated to ${newStatus}` });
    } catch (error) {
      res.status(500).json({ error: 'Error updating booking status' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
