import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { UserRoutes } from './routes/UserRoutes';
import { TeamRoutes } from './routes/TeamRoutes';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

class App {
  public app: express.Application;
  public usersRoutes: UserRoutes = new UserRoutes();
  public teamsRoutes: TeamRoutes = new TeamRoutes();
  public mongoUrl: string = 'mongodb://tomislav:snlab1@ds125683.mlab.com:25683/snlab1';

  constructor () {
    this.app = express();
    this.app.use(cors({credentials: true, origin: true}));
    this.middleware();
    this.app.get('/api', (req, res, next) => {
      res.send('API home');
    });
    this.usersRoutes.routes(this.app);
    this.teamsRoutes.routes(this.app);
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