import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust this import based on your project structure
import { setCookie } from 'cookies-next'; // For managing session cookies

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body; // No need to send the role

    try {
      // Find user based on email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // Validate if user exists and password matches
      if (user && user.password === password) {
        const userName = user.name;
        const userRole = user.role; // Retrieve the role from the user object

        // Set a cookie for the session
        setCookie('userSession', JSON.stringify({ id: user.id, name: userName, role: userRole }), { req, res });

        return res.status(200).json({ message: 'Login successful', role: userRole, userName });
      }

      // If no valid user found or password doesn't match
      return res.status(401).json({ error: 'Invalid email or password' });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
