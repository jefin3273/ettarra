// pages/api/events.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, description, date, chefDetails, price, totalSeats, createdBy } = req.body;
      
      if (!title || !description || !date || !chefDetails || !price || !totalSeats || !createdBy) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const event = await prisma.event.create({
        data: {
          title,
          description,
          date: new Date(date),
          chefDetails,
          price: parseFloat(price),
          seatsAvailable: parseInt(totalSeats),
          totalSeats: parseInt(totalSeats),
          createdBy,
        },
      });
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Error creating event' });
    }
  } else if (req.method === 'GET') {
    try {
      const events = await prisma.event.findMany();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Error fetching events' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}