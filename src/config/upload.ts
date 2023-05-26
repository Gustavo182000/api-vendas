import multer from 'multer';
import path from 'path';

const uploadFolder: string = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      const filename = `${req.user.id}-Profile-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
