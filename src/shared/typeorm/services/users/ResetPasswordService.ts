import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import UserToken from '@shared/typeorm/entities/UserToken';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcrypt';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    const userTokenRepository = AppDataSource.getRepository(UserToken);

    const userToken = await userTokenRepository.findOne({ where: { token } });

    if (!userToken) {
      throw new AppError('Token não existe');
    }
    const user = await userRepository.findOne({
      where: { id: userToken.user_id },
    });

    if (!user) {
      throw new AppError('O usuário não existe');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('O token não é mais válido');
    }
    const hashedPassw = await hash(password!, 8);
    user.password = hashedPassw;
    await userRepository.save(user);
  }
}

export default ResetPasswordService;
