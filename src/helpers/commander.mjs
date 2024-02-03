import { changeWorkingDirectory } from '../operations/navigation.mjs';

export const commander = {
    up () {
        changeWorkingDirectory('../');
    },
    cd ([path]) {
        changeWorkingDirectory(path);
    },
};