import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import { compare, hash } from 'bcrypt';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userUpdateEmail = await userRepository.findOne({
      where: { email },
    });

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('E-mail dá cadastrado');
    }

    if (password && !old_password) {
      throw new AppError('É necessário o envio da senha entiga');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, password);
      if (!checkOldPassword) {
        throw new AppError('Senha antiga invalida');
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
