import { changeWorkingDirectory } from '../operations/navigation.mjs';
import { list } from '../operations/list.mjs';
import { add, copy, move, read, remove, rename } from '../operations/fs.mjs';
import { printOsInfo } from '../operations/os.mjs';
import { printHash } from '../operations/hash.mjs';
import { processArchive } from '../operations/zip.mjs';
import { archiveActionEnum } from '../enums/archive-action-enum.mjs';

export const commander = {
    up () {
        changeWorkingDirectory('../');
    },
    cd ([path]) {
        changeWorkingDirectory(path);
    },
    ls () {
        (async function() { await list(); })();
    },
    cat ([filePath]) {
        (async function() { await read(filePath); })();
    },
    add ([fileName]) {
        (async function() { await add(fileName); })();
    },
    rn ([filePath, fileName]) {
        (async function() { await rename(filePath, fileName); })();
    },
    cp ([filePath, directoryPath]) {
        (async function() { await copy(filePath, directoryPath); })();
    },
    mv ([filePath, directoryPath]) {
        (async function() { await move(filePath, directoryPath); })();
    },
    rm ([filePath]) {
        (async function() { await remove(filePath); })();
    },
    os ([arg]) {
        printOsInfo(arg);
    },
    hash ([filePath]) {
        (async function() { await printHash(filePath); })();
    },
    compress ([filePath, directoryPath]) {
        (async function() { await processArchive(
            filePath,
            directoryPath,
            archiveActionEnum.compress
        ); })();
    },
    decompress ([filePath, directoryPath]) {
        (async function() { await processArchive(
            filePath,
            directoryPath,
            archiveActionEnum.decompress
        ); })();
    },
};