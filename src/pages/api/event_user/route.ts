// pages/api/events.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Ensure prisma is properly initialized in your project

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Error fetching events" });
  }
}
