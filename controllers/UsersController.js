import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password} = req.body;

    if (!email) {
      return res.status(400).send({ error: 'Misssing email' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }
    try {
      const existingUser = await dbClient.userColle.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ error: 'Already exist' });
      }

      const  hashedpasswd = sha1(password);
      const newUser = await dbClient.userColle.insertOne({ email, password: hashedpasswd });
      return res.status(201).json({ id: newUser.insertedId, email });
    } catch(err) {
      console.error('Error creating user:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
