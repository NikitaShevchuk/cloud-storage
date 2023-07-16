import { diskStorage, DiskStorageOptions } from 'multer';
import { extname } from 'path';

const editFileName: DiskStorageOptions['filename'] = (_, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);

  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const interceptorOptions = {
  storage: diskStorage({
    destination: './files',
    filename: editFileName,
  }),
};
