import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import User from '@shared/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    //Se o usuário já possue avatar
    if (user.avatar) {
      // it will find the file starting with the prefix "<id of user>-Profile" considering that will be unique among all of the avatars uploaded by the user.
      const userAvatarFile = fs.readdirSync(uploadConfig.directory).find(file => file.startsWith(`${user.id}-Profile`) && file != avatarFilename);
      //Se o arquivo existe ele é removido
      if (userAvatarFile) {
        const userAvatarFilePath = path.join(uploadConfig.directory, userAvatarFile);
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
