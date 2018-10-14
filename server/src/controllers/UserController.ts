import * as mongoose from 'mongoose';
import { UserSchema } from '../models/UserModel';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';

const User = mongoose.model('User', UserSchema);

export class UserController {
  public getUser(req: Request, res: Response, next: NextFunction) {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
          err = new Error('User with given id not found!');
          err.status = 404;
        }
        next(err);
      } else if (user) {
        res.json(user);
      } else {
        err = new Error('User with given id not found!');
        err.status = 404;
        next(err);
      }
    });
  }

  public getAllUsers(req: Request, res: Response, next: NextFunction) {
    User.find({}, (err, users) => {
      if (err) {
        next(err);
      } else {
        res.json(users);
      }
    });
  }

  public addNewUser(req: Request, res: Response, next: NextFunction) {
    const newUser = new User(req.body);
    newUser._id = req.body.userId;

    newUser.save((err, user) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(user);
      }
    });
  }

  public updateUser(req: Request, res: Response, next: NextFunction) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        res.json(user);
      } else {
        err = new Error('User with given id not found!');
        err.status = 404;
        next(err);
      }
    });
  }

  public deleteUser(req: Request, res: Response, next: NextFunction) {
    User.findByIdAndDelete(req.params.userId, (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        res.status(204).send();
      } else {
        err = new Error('User with given id not found!');
        err.status = 404;
        next(err);
      }
    });
  }
}