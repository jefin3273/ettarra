// pages/api/booking/[bookingId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { bookingId } = req.query;

  if (req.method === 'GET') {
    try {
      const booking = await prisma.booking.findUnique({
        where: {
          id: String(bookingId),
        },
      });

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.status(200).json(booking);
    } catch (error) {
      console.error("Error retrieving booking:", error);
      res.status(500).json({ error: 'Failed to retrieve booking' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
