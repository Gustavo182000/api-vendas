import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import UserToken from '@shared/typeorm/entities/UserToken';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    const userTokenRepository = AppDataSource.getRepository(UserToken);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const token = await userTokenRepository.create({ user_id: user.id });
    await userTokenRepository.save(token);
    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
