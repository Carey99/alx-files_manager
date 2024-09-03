import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const dbName = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.db = null;
    this.userColle = null;
    this.filecolle = null;
    this.connect();
  }

  async connect() {
    try {
      const client = await MongoClient.connect(url, { useUnifiedTopology: true });
          this.db = client.db(dbName);
          this.userColle = this.db.collection('users');
          this.filecolle = this.db.collection('files');
    } catch(err) {
      console.error(err.message);
      this.db = false;
    }
  }

  isAlive() {
    return Boolean(this.db)
  }

  async nbUsers() {
    if (!this.userColle) return 0;
    try {
      const userCount = await this.userColle.countDocuments();
      return userCount;
    } catch(err) {
      console.error(err.message);
      return 0;
    }
  }

  async nbFiles() {
    if (!this.filecolle) return 0;
    try {
      const fileCount = await this.filecolle.countDocuments();
      return fileCount;
    } catch(err) {
      console.error(err.message);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
