import * as mongoose from 'mongoose';
import { UserSchema } from '../models/UserModel';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import fetch from 'node-fetch';

const baseUrl = 'https://www.thesportsdb.com/api/v1/json/1';

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
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, upsert: true },
      (err, user) => {
        if (err) {
          next(err);
        } else if (user) {
          res.json(user);
          const teams = req.body.favoriteTeams as Array<string>;
          teams.forEach(fetchTeam);
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

export function fetchTeam(teamName: string) {
  if (!teamName) {
    return;
  }
  console.log(teamName);
  teamName = teamName.toLowerCase().replace('fc', '').trim();
  console.log(teamName);
  fetch(`${baseUrl}/searchteams.php?t=${teamName}`);
  // TODO: save team
}