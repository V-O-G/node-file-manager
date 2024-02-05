import { arch, cpus, EOL, userInfo } from 'os';

import { tryAction } from '../helpers/common.mjs';
import { logOperationMessage } from '../helpers/messages.mjs';
import { messageEnum } from '../enums/message-enum.mjs';

export function printOsInfo(arg) {
    switch(arg) {
        case '--EOL':
            tryAction(() => { console.log(JSON.stringify(EOL)) });
            break;
        case '--cpus':
            tryAction(() => { console.table(getCpusData())});
            break;
        case '--homedir':
            tryAction(() => { console.log(userInfo().homedir)});
            break;
        case '--username':
            tryAction(() => { console.log(userInfo().username)});
            break;
        case '--architecture':
            tryAction(() => { console.log(arch())});
            break;
        default:
            logOperationMessage(messageEnum.invalid);
            logOperationMessage(messageEnum.success);
    }
}

function getCpusData() {
    return cpus().map(cpu => ({
        'model': cpu.model,
        'speed, GHz': cpu.speed / 1000,
    }));
}