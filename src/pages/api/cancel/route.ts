import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { bookingId } = req.body;
    try {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'cancelled' },
      });
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error cancelling booking' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
