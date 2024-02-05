import { createHash } from 'crypto';
import { lstat, open } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { tryAsyncAction, createWritable } from '../helpers/common.mjs';

export async function printHash(filePath) {
    async function actionHash() {
        const hash = createHash('sha256');
        
        const fileFd = await open(filePath);
        fileFd.on('error', () => fileFd.close());

        await pipeline(
            fileFd.createReadStream(filePath),
            hash.setEncoding('hex'),
            createWritable()
        );
    }
    await tryAsyncAction(actionHash);
}