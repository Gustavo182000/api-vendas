import ResetPasswordService from '@shared/typeorm/services/users/ResetPasswordService';
import { Request, Response } from 'express';

class ResetPasswordEmailController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = new ResetPasswordService();
    await resetPassword.execute({ token, password });
    return res.status(200).json({ status: 'success' });
  }
}

export default ResetPasswordEmailController;
