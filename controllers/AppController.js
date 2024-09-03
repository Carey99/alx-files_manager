import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

class AppController {
  static async getStatus(req, res) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();

    res.status(200).json({ redis: redisStatus, db: dbStatus })
  }

  static async getStats(req, res) {
    try {
      const users = await dbClient.nbUsers();

      const files = await dbClient.nbFiles();

      res.status(200).json({ users, files });
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
