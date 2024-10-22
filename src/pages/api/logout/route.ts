// pages/api/logout/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the session cookie
    setCookie('userSession', '', { maxAge: -1, req, res }); // This will delete the cookie
    return res.status(200).json({ message: 'Logged out successfully' });
  } else {
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
