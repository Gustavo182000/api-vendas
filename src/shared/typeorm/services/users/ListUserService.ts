import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[] | undefined | null> {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    return users;
  }
}

export default ListUserService;
