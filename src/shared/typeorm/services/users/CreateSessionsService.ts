import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import IUser from '@shared/typeorm/interfaces/IUser';
import { compare } from 'bcrypt';

class CreateSessionsService {
  public async execute({ email, password }: IUser): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Usuário/senha incorreto', 401);
    }
    const userCompare = await compare(password!, user.password);
    if (!userCompare) {
      throw new AppError('Senha incorreta', 401);
    }
    return user;
  }
}

export default CreateSessionsService;
