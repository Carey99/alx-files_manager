import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password} = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Misssing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }
    try {
      const existingUser = await dbClient
    } catch(err) {}
  }
}