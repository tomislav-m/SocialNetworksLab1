import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

class App {
  public express: express.Application;

  constructor () {
    this.express = express();
    this.middleware();
    this.mountRoutes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private mountRoutes (): void {
    const router = express.Router();
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/api', router);
  }
}

export default new App().express;