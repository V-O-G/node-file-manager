import { access, open, rename as renameFs, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { cwd } from 'process';
import { pipeline } from 'stream/promises';

import { tryAsyncAction, createWritable } from '../helpers/common.mjs';

export async function read(fileName) {
    async function actionRead() {
        const newFilePath = joinPathToFile(fileName);
        const fd = await open(newFilePath);
        await pipeline(fd.createReadStream(newFilePath), createWritable());
    }
    await tryAsyncAction(actionRead);
}

export async function add(fileName) {
    async function actionAdd() {
        await writeFile(joinPathToFile(fileName), '', { flag: 'wx' });
    }
    await tryAsyncAction(actionAdd);
};

export async function rename(filePath, fileName) {
  const newFilePath = joinPathToFile(fileName, dirname(filePath));
  
  async function actionRename() {
    if (await fileExists(newFilePath) || !await fileExists(filePath)) {
      throw Error;
    } else {
        await renameFs(filePath, newFilePath);
    }
  }
  await tryAsyncAction(actionRename);
};

function joinPathToFile(fileName, filePath = cwd()) {
    return join(filePath, fileName);
}

async function fileExists(path) {  
    try {
      await access(path);
      return true;
    } catch (error) {
        return false;
    }
}