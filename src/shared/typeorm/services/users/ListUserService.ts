import RedisCache from '@shared/cache/RedisCache';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[] | undefined | null> {
    const userRepository = AppDataSource.getRepository(User);

    const redisCache = new RedisCache();

    let users = await redisCache.recover<User[]>('users');

    if (!users) {
      users = await userRepository.find();
      await redisCache.save('users', users);
    }

    return users;
  }
}

export default ListUserService;
