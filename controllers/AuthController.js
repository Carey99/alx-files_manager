import userUtils from "../utils/user";
import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';


class AuthController {
  static async getConnect(req, res) {
    const Auth = req.header('Authorization') || '';
    const credentials = Auth.split(' ')[1];

    if (!credentials) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const decoded_cred = Buffer.from(credentials, 'base64').toString('utf-8');
    const [email, password] = decoded_cred.split(':');

    if (!email || password) { return res.status(401).send({ error: 'Unauthorized' }); }

    const sha1passwd = sha1(password);
    const user = await userUtils.getUser({
      email,
      password: sha1passwd
    });

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const token = uuidv4();
    const key = `auth_${token}`;
    const hoursForExpiration = 24;
    await redisClient.set(key, user._id.toString(), hoursForExpiration * 3600);
    return res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const { userId, key } = await userUtils.getUserIdAndKey(req);
    if (!userId) return res.status(401).send({ error: 'Unauthorized' });

    await redisClient.del(key);
    return res.status(204).send();
  }
}

export default AuthController;
