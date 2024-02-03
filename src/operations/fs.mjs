import { cwd } from 'process';
import { pipeline } from 'stream/promises';
import { open, writeFile } from 'fs/promises';
import { join } from 'path';

import { tryAsyncAction, createWritable } from '../helpers/common.mjs';

export async function read(fileName) {
    async function actionRead() {
        const newFilePath = join(cwd(), fileName);
        const fd = await open(newFilePath);
        await pipeline(fd.createReadStream(newFilePath), createWritable());
    }
    await tryAsyncAction(actionRead);
}

export async function add(fileName) {
    async function actionAdd() {
        const newFilePath = join(cwd(), fileName);
        await writeFile(newFilePath, '', { flag: 'wx' });
    }
    await tryAsyncAction(actionAdd);
};