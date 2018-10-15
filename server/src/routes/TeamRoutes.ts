import { Router } from 'express';
import { TeamController } from '../controllers/TeamController';

const baseUrl: string = '/api';

export class TeamRoutes {
  public teamController: TeamController = new TeamController();

  public routes(app: Router): void {
    app.route(`${baseUrl}/teams`)
      .get(this.teamController.getAllTeams)
      .post(this.teamController.addNewTeam);
    app.route(`${baseUrl}/teams/:teamId`)
      .get(this.teamController.getTeam)
      .put(this.teamController.updateTeam)
      .delete(this.teamController.deleteTeam);
  }
}