import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { parse, join } from 'path';
import { lstat, open } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { tryAsyncAction, closeFhOnError } from '../helpers/common.mjs';
import { archiveActionEnum } from '../enums/archive-action-enum.mjs';

export async function processArchive (filePath, directoryPath, action) {
    async function actionCompress() {        
        let destinationPath;
        let brotli;

        switch (action) {
            case archiveActionEnum.compress:
                if((await lstat(filePath)).isDirectory()) { throw Error; };
                
                destinationPath = join(directoryPath, `${ parse(filePath).base }.br`);
                brotli = createBrotliCompress();
                break;
            case archiveActionEnum.decompress:
                destinationPath = join(directoryPath, `${ parse(filePath).name }`);
                brotli = createBrotliDecompress();
                break;
        }

        const fhRead = await open(filePath);
        const fhWrite = await open(destinationPath, 'wx');
        closeFhOnError(fhRead);
        closeFhOnError(fhWrite);

        await pipeline(
            fhRead.createReadStream(filePath),
            brotli,
            fhWrite.createWriteStream(destinationPath),
        );
    }
    await tryAsyncAction(actionCompress);
}