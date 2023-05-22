import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import IUser from '@shared/typeorm/interfaces/IUser';

class CreateUserService {
  public async execute({ name, email, password }: IUser): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const emailExists = await userRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new AppError('E-mail já cadastrado');
    }
    const user = userRepository.create({ name, email, password });
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
