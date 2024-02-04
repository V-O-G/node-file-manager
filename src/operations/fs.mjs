import { access, open, rename as renameFs, rm, writeFile, lstat } from 'fs/promises';
import { basename, join, dirname, resolve } from 'path';
import { cwd } from 'process';
import { pipeline } from 'stream/promises';

import { tryAsyncAction, createWritable } from '../helpers/common.mjs';

// cat:
export async function read(fileName) {
    async function actionRead() {
        const filePath = joinPathToFile(fileName);
        const fd = await open(filePath);
        await pipeline(fd.createReadStream(filePath), createWritable());
    }
    await tryAsyncAction(actionRead);
}

// add:
export async function add(fileName) {
    async function actionAdd() {
        await writeFile(joinPathToFile(fileName), '', { flag: 'wx' });
    }
    await tryAsyncAction(actionAdd);
};

// rn:
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

// cp:
export async function copy(filePath, directoryPath) {
  await tryAsyncAction(async () => await actionCopy(filePath, directoryPath));
};

// mv:
export async function move(filePath, directoryPath) {
  async function actionMove() {
    await actionCopy(filePath, directoryPath);
    await rm(filePath);
  }
  await tryAsyncAction(actionMove);
};

async function actionCopy(filePath, directoryPath) {
  if((await lstat(filePath)).isDirectory()) { throw Error; };
  const newFilePath = joinPathToFile(basename(filePath), resolve(directoryPath));
  const fileFd = await open(filePath);
  const newFileFd = await open(newFilePath, 'w');
  await pipeline(
    fileFd.createReadStream(filePath),
    newFileFd.createWriteStream(newFilePath),
  );
}

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