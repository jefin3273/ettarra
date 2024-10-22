import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust this import based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    console.log('Received request:', req.body); // Log the incoming request body

    try {
      // Find user based on email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      console.log('User found:', user); // Log the user object

      // Validate if user exists and password matches
      if (user && user.password === password) { // Direct comparison
        const userName = user.name;
        const userRole = user.role;

        // Instead of setting a cookie, you can just return the user data or a success message
        return res.status(200).json({ message: 'Login successful', role: userRole, userName });
      }

      // If no valid user found or password doesn't match
      return res.status(401).json({ error: 'Invalid email or password' });
    } catch (error) {
      console.error('Database error:', error); // Log the error
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
