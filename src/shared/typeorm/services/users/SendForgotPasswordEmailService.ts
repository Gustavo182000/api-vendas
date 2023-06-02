import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import path from 'path';
import User from '@shared/typeorm/entities/User';
import UserToken from '@shared/typeorm/entities/UserToken';
import EtherealMail from '@config/mail/EtherealMail';

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'modules',
      'users',
      'views',
      'forgot_password.hbs',
    );

    const etherealMail = new EtherealMail();
    await etherealMail.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[API VENDAS] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:300/reset_password?${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
