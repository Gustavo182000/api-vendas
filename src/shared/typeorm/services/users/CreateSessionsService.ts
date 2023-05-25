import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import IUser from '@shared/typeorm/interfaces/IUser';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IUser): Promise<IResponse> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Usuário/senha incorreto', 401);
    }
    const userCompare = await compare(password!, user.password);
    if (!userCompare) {
      throw new AppError('Senha incorreta', 401);
    }
    const token = sign({ nome: user.name, email: user.email }, '123456', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default CreateSessionsService;
