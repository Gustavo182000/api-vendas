import SendForgotPasswordEmailService from '@shared/typeorm/services/users/SendForgotPasswordEmailService';
import { Request, Response } from 'express';

class ForgotPasswordEmailController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}

export default ForgotPasswordEmailController;
