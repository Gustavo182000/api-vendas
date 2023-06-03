import ShowProfileService from '@shared/typeorm/services/users/ShowProfileService';
import UpdateProfileService from '@shared/typeorm/services/users/UpdateProfileService';
import { Request, Response } from 'express';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = req.user.id;
    const users = await showProfile.execute({ user_id });
    return res.json(users);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const updateProfile = new UpdateProfileService();
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;
    const user = updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return res.json(user);
  }
}

export default ProfileController;
