import connect from 'mongodb';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error('Redis client Error:', err)
    });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    if (!this.isAlive()) {
        await this.client.connect;
      }
    try {
      const val = await this.client.get(key);
      return val;
    } catch(err) {
      console.error(err);
      return null;
    }
  }

  async set(key, value, duration) {
    if (!this.isAlive()) {
      await this.client.connect;
    }
    try {
      if (duration) {
        await this.client.set(key, value, { EX: duration });
      } else {
        await this.client.set(key, value);
      }
    } catch(err) {
      console.log(err);
      return null;
    }
  }

  async del(key) {
    if (!this.isAlive()) {
      await this.client.connect;
    }

    try {
      await this.client.del(key);
    } catch(err) {
      console.error(err)
    }
  }
}

module.exports = new RedisClient();
