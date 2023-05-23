import CreateSessionsService from '@shared/typeorm/services/users/CreateSessionsService';
import { Request, Response } from 'express';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = new CreateSessionsService();
    const session = await createSession.execute({ email, password });
    return res.json(session);
  }
}

export default SessionsController;
