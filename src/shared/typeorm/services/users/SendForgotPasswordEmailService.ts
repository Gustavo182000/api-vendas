import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
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
    // console.log(token.token);
    const etherealMail = new EtherealMail();
    await etherealMail.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[API VENDAS] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token: token.token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
