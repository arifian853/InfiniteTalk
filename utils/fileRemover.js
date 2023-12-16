import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentModulePath = path.dirname(fileURLToPath(import.meta.url));
const uploadsPath = path.resolve(currentModulePath, '../uploads');

const fileRemover = (filename) => {
  fs.unlink(path.join(uploadsPath, filename), function (err) {
    if (err && err.code == 'ENOENT') {
      // file doesn't exist
      console.log(`File ${filename} doesn't exist, can't remove it.`);
    } else if (err) {
      console.log(err.message);
      console.log(`Error occurred while trying to remove file ${filename}`);
    } else {
      console.log(`Removed ${filename}`);
    }
  });
};

export { fileRemover };
