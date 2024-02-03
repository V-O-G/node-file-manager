import { changeWorkingDirectory } from '../operations/navigation.mjs';
import { list } from '../operations/list.mjs';
import { add, read } from '../operations/fs.mjs';

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
};