import { extname } from 'path';
import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './public',
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
