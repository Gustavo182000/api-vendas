import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const redisCache = new RedisCache();

    const user = await userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    if (user.avatar) {
      // it will find the file starting with the prefix "<id of user>-Profile" considering that will be unique among all of the avatars uploaded by the user.
      const userAvatarFile = fs
        .readdirSync(uploadConfig.directory)
        .find(
          file =>
            file.startsWith(`${user.id}-Profile`) && file != avatarFilename,
        );
      if (userAvatarFile) {
        const userAvatarFilePath = path.join(
          uploadConfig.directory,
          userAvatarFile,
        );
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await redisCache.invalidate('users');
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
