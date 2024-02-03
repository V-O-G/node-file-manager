import { changeWorkingDirectory } from '../operations/navigation.mjs';
import { list } from '../operations/list.mjs';

export const commander = {
    up () {
        changeWorkingDirectory('../');
    },
    cd ([path]) {
        changeWorkingDirectory(path);
    },
    ls () {
        (async function() { await list() })();
    },
};