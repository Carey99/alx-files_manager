import express from 'express';
import AppController from '../controllers/AppController';
import AppController from '../controllers/UsersController';

const controllerRouting = (app) => {
  const router = express.Router();

  app.use('/', router);

  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  })

  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  })

  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  })
}

export default controllerRouting;
