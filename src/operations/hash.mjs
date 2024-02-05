import { createHash } from 'crypto';
import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { tryAsyncAction, createWritable, closeFhOnError } from '../helpers/common.mjs';

export async function printHash(filePath) {
    async function actionHash() {
        const hash = createHash('sha256');
        
        const fhRead = await open(filePath, 'r');
        closeFhOnError(fhRead);

        await pipeline(
            fhRead.createReadStream(filePath),
            hash.setEncoding('hex'),
            createWritable()
        );
    }
    await tryAsyncAction(actionHash);
}