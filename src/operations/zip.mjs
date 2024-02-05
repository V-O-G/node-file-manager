import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { parse, join } from 'path';
import { lstat, open } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { tryAsyncAction } from '../helpers/common.mjs';
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

        const fileFd = await open(filePath);
        const newFileFd = await open(destinationPath, 'wx');
        fileFd.on('error', () => fileFd.close());
        newFileFd.on('error', () => newFileFd.close());

        await pipeline(
            fileFd.createReadStream(filePath),
            brotli,
            newFileFd.createWriteStream(destinationPath),
        );
    }
    await tryAsyncAction(actionCompress);
}