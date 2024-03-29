import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import IUser from '@shared/typeorm/interfaces/IUser';
import RedisCache from '@shared/cache/RedisCache';

import { hash } from 'bcrypt';

class CreateUserService {
  public async execute({ name, email, password }: IUser): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const redisCache = new RedisCache();

    const emailExists = await userRepository.findOne({ where: { email } });

    if (emailExists) {
      throw new AppError('E-mail já cadastrado');
    }
    const hashedPassw = await hash(password!, 8);
    const user = userRepository.create({ name, email, password: hashedPassw });
    await redisCache.invalidate('users');
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
