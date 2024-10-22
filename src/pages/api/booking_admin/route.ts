// pages/api/booking/approve.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id } = req.body;

      // Update the booking status to approved
      const booking = await prisma.booking.update({
        where: { id },
        data: { status: 'approved' },
      });

      res.status(200).json(booking);
    } catch (error) {
      console.error("Error approving booking:", error);
      res.status(500).json({ error: 'Failed to approve booking' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
