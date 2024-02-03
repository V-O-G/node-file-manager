import { chdir } from 'process';

import { tryAction } from '../helpers/common.mjs';

export function changeWorkingDirectory(path) {
    tryAction(() => chdir(path));
}