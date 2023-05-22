import CreateUserService from '@shared/typeorm/services/users/CreateUserService';
import ListUserService from '@shared/typeorm/services/users/ListUserService';
import { Request, Response } from 'express';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();
    return res.json(users);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return res.json(user);
  }
}

export default UsersController;
