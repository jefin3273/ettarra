// pages/api/signup/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { formData, role } = req.body;

    try {
      // Save user data to MongoDB using Prisma
      const user = await prisma.user.create({
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password, // You should hash this password before saving
          role: role || 'USER',
          phone: formData.phoneno,  // Store the phone number
        },
      });

      res.status(200).json({ message: 'User added to MongoDB', user });
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
      res.status(500).json({ error: 'Error saving data to MongoDB' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

