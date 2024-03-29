import { UserController } from '../controllers/UserController';
import { Router } from 'express';

const baseUrl: string = '/api';

export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Router): void {
    app.route(`${baseUrl}/users`)
      .get(this.userController.getAllUsers)
      .post(this.userController.addNewUser);
    app.route(`${baseUrl}/users/:userId`)
      .get(this.userController.getUser)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);
    app.route(`${baseUrl}/users/:userId/:teamId`)
      .get(this.userController.addFavoriteTeam);
      app.route(`${baseUrl}/unfollow/:userId/:teamId`)
      .get(this.userController.unfollowTeam);
  }
}