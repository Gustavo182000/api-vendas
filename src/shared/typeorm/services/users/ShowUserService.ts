import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import IUser from '@shared/typeorm/interfaces/IUser';

class ShowUserService {
  public async execute({ id }: IUser): Promise<User | undefined> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new AppError('Produto não encontrado');
    }
    return user;
  }
}

export default ShowUserService;
