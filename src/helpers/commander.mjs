import { changeWorkingDirectory } from '../operations/navigation.mjs';
import { list } from '../operations/list.mjs';
import { add, copy, move, read, rename } from '../operations/fs.mjs';

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
    cat ([fileName]) {
        (async function() { await read(fileName); })();
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
};