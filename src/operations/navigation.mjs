import { chdir } from 'process';
import { homedir } from 'os';

import { tryAction } from '../helpers/common.mjs';

export function changeWorkingDirectory(path = homedir()) {
    tryAction(() => chdir(path));
}