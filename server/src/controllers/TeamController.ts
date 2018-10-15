import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import { TeamSchema } from '../models/TeamModel';

const Team = mongoose.model('Team', TeamSchema);

export class TeamController {
  public getTeam(req: Request, res: Response, next: NextFunction) {
    Team.findById(req.params.teamId, (err, team) => {
      if (err) {
        if (!mongoose.Types.ObjectId.isValid(req.params.teamId)) {
          err = new Error('Team with given id not found!');
          err.status = 404;
        }
        next(err);
      } else if (team) {
        res.json(team);
      } else {
        err = new Error('Team with given id not found!');
        err.status = 404;
        next(err);
      }
    });
  }

  public getAllTeams(req: Request, res: Response, next: NextFunction) {
    Team.find({}, (err, teams) => {
      if (err) {
        next(err);
      } else {
        res.json(teams);
      }
    });
  }

  public addNewTeam(req: Request, res: Response, next: NextFunction) {
    const newTeam = new Team(req.body);
    newTeam._id = req.body.teamId;

    newTeam.save((err, team) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(team);
      }
    });
  }

  public updateTeam(req: Request, res: Response, next: NextFunction) {
    Team.findOneAndUpdate({ _id: req.params.teamId }, req.body, { new: true, upsert: true },
      (err, team) => {
        if (err) {
          next(err);
        } else if (team) {
          res.json(team);
        } else {
          err = new Error('Team with given id not found!');
          err.status = 404;
          next(err);
        }
      });
  }

  public deleteTeam(req: Request, res: Response, next: NextFunction) {
    Team.findByIdAndDelete(req.params.teamId, (err, team) => {
      if (err) {
        next(err);
      } else if (team) {
        res.status(204).send();
      } else {
        err = new Error('Team with given id not found!');
        err.status = 404;
        next(err);
      }
    });
  }
}