import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/UserRoutes';
import * as mongoose from 'mongoose';

class App {
  public app: express.Application;
  public usersRoutes: Routes = new Routes();
  public mongoUrl: string = 'mongodb://tomislav:snlab1@ds125683.mlab.com:25683/snlab1';

  constructor () {
    this.app = express();
    this.middleware();
    this.app.get('/api', (req, res, next) => {
      res.send('API home');
    });
    this.usersRoutes.routes(this.app);
    this.handleErrors();
    this.mongoSetup();
  }

  private middleware(): void {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl);
  }

  private handleErrors(): void {
    this.app.use((req, res, next) => {
      const error: any = new Error('Not found!');
      error.status = 404;
      next(error);
    });

    this.app.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message
        }
      });
    });
  }
}

export default new App().app;