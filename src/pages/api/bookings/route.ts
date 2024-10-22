
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const bookings = await prisma.booking.findMany({
        select: {
          userId: true,
          eventId: true,
          seatsBooked: true,
  totalPrice: true,
  status: true,
  createdAt: true,
        },
      }
);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching bookings' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}